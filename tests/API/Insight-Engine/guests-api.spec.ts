import { test, expect } from '@playwright/test';
import { distance } from 'fastest-levenshtein';
import { json2csv } from 'json-2-csv';
import fs from 'fs';

const staginUrl = "https://kempinski.stage.concilioinsights.com/api/v1/dataset/profile/source/";

test.describe('Insight Engine API test', () => {

    test("check guest exists", async ({ request }) => {
        const filerParam = [{ "$or": [{ "guestProfile.firstName": { "$prefix": "" } }, { "guestProfile.lastName": { "$prefix": "" } }, { "guestProfile.email": { "$prefix": "" } }, { "guestProfile.concilioId": { "$prefix": "" } }, { "guestProfile.datamart.datamartMembershipId": { "$prefix": "" } }, { "booking.confirmationNumber": { "$prefix": "" } }] }]
        const fieldsParam = ["guestProfile.email", "guestProfile.firstName", "guestProfile.lastName", "guestProfile.membership", "guestProfile.concilioId", "guestProfile.phone", "guestProfile.lastMergeDate", "guestProfile.isMergeAllowed"]
        let membersList = [];
        for (let membersOffset = 0; membersOffset <= 500; membersOffset += 500) {
            const guestProfile = await request.get(staginUrl, {
                params: {
                    offset: membersOffset,
                    limit: 500,
                    filters: JSON.stringify(filerParam),
                    fields: JSON.stringify(fieldsParam),
                }
            })
            expect(guestProfile.ok(), `Status code is: ${await guestProfile.status()}`).toBeTruthy();
            const response = await guestProfile.json();
            membersList.push(...response.result[0].items);
        }

        let results = []
        let matchedIndexes: number[] = []

        for (let i = 0; i < membersList.length; i++) {
            const member = membersList[i].guestProfile;

            for (let y = 0; y < membersList.length; y++) {
                if (i !== y && !matchedIndexes.includes(i)) {
                    const candidate = membersList[y].guestProfile;
                    const firstNameLevenshtein = getLevenshteinPercentageSimilarity(member.firstName, candidate.firstName);
                    const lastNameLevenshtein = getLevenshteinPercentageSimilarity(member.lastName, candidate.lastName);
                    const emailLevensteinPercentage = getLevenshteinPercentageSimilarity(member.email, candidate.email)
                    if (firstNameLevenshtein >= 91 && lastNameLevenshtein >= 91) {
                        if(emailLevensteinPercentage == 100){
                            matchedIndexes.push(y)
                            results.push({ member: { firstName: member.firstName, lastName: member.lastName, id:member.concilioId, email: member.email }, candidate: { firstName: candidate.firstName, lastName: candidate.lastName, id:candidate.concilioId, email: candidate.email } })
                        }
                    }
                }
            }

        }
        if (results.length > 0){
            const csv = json2csv(results)
            fs.writeFileSync(`test-results/results-${Date.now().toString()}.csv`, csv)
            expect(results.length, `Unexpected ${results.length} matched profiles: \n ${JSON.stringify(results)}`).toBe(0);
        }
    });
})

function getLevenshteinPercentageSimilarity(str1: string, str2: string) {
    // Source https://dev.to/fabriziobagala/levenshtein-distance-5d40
    const levenshteinDistance = distance(str1, str2);
    // accounting for when email is empty
    let longestWordChars:number = str1.length == 0 && str2.length == 0 ? 1 : Math.max(str1.length, str2.length);
    const percentage = (1 - (levenshteinDistance) / longestWordChars) * 100
    return parseFloat(percentage.toFixed(1));
}