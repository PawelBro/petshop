import test, {expect} from "@playwright/test";
import {faker} from "@faker-js/faker";
import petBodyRequest from "../test-data/petBodyRequest.json";


test('Pet not found', async ({request}) => {
    let petId: number;

    petId = 1111111111111111-11;

    const getAPIResponse = await request.get(`pet/${petId}`);

    console.log("======= POST RESPONSE CODE POST=======");
    console.log(getAPIResponse.status());
    expect(getAPIResponse.status()).toBe(404);

    let responseBody = await getAPIResponse.json();
    console.log("=======GET RESPONSE BODY=======");
    console.log(responseBody);
    expect(responseBody.message).toBe("Pet not found");
});

test('Invalid id supplied', async ({ request }) => {
    const invalidPetId = 'invalid-id';
    const response = await request.get(`/pet/${invalidPetId}`);

    expect(response.status()).toBe(400);
});