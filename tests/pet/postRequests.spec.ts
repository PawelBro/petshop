import test, {expect} from "@playwright/test";
import {faker} from "@faker-js/faker";
import petBodyRequest from "../test-data/petBodyRequest.json";

test('Pet API Requests', async ({request}) => {
    let name: string;
    let randomId: number;
    let randomCategoryId: number;

    //Set up data for the test
    randomId = Math.floor(Math.random() * 100);
    randomCategoryId = Math.floor(Math.random() * 100);
    name = faker.word.sample();
    petBodyRequest.id = randomId;
    petBodyRequest.name = name;
    petBodyRequest.category.id = randomCategoryId;

    //Create pet with POST api request
    const postAPIResponse = await request.post('pet', {
        data: petBodyRequest
    });

    console.log("======= POST RESPONSE CODE POST=======");
    console.log(postAPIResponse.status());

    expect(postAPIResponse.ok()).toBeTruthy();
    expect(postAPIResponse).not.toBeNull();

    let responseBody = await postAPIResponse.json();
    expect(responseBody.name).toBe(name);
    console.log("======= POST RESPONSE BODY POST=======");
    console.log(responseBody)
});

