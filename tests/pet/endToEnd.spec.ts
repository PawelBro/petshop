import test, {expect} from "@playwright/test";
import petBodyRequest from '../test-data/petBodyRequest.json';
import {faker} from '@faker-js/faker';

test('Pet API Requests', async ({request}) => {
    let petId: number;
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
    petId = responseBody.id;
    expect(responseBody.name).toBe(name);
    console.log("======= POST RESPONSE BODY POST=======");
    console.log(responseBody);

    //Get pet with GET api request
    const getAPIResponse = await request.get(`pet/${petId}`);

    responseBody = await getAPIResponse.json();
    console.log("=======GET RESPONSE BODY=======");
    console.log(responseBody);
    expect(responseBody.id).toBe(petId);
    expect(responseBody.name).toBe(name);

    //Update pet with PUT api request
    petBodyRequest.category.name = faker.word.sample();

    const putAPIResponse = await request.put('pet', {
        data: petBodyRequest
    });

    console.log("=======PUT RESPONSE CODE=======");
    console.log(putAPIResponse.status());
    expect(putAPIResponse.ok()).toBeTruthy();
    expect(putAPIResponse).not.toBeNull();

    responseBody = await putAPIResponse.json();
    console.log("======= PUT RESPONSE BODY=======");
    console.log(responseBody);
    expect(responseBody.category.name).toBe(petBodyRequest.category.name);

    //Delete pet with DELETE api request
    const deleteAPIResponse = await request.delete(`pet/${petId}`);

    console.log("=======DELETE RESPONSE CODE=======");
    console.log(deleteAPIResponse.status());
    expect(deleteAPIResponse.ok()).toBeTruthy();
    expect(deleteAPIResponse).not.toBeNull();

    responseBody = await deleteAPIResponse.json();
    expect(responseBody.message).toBe(petId.toString());

    //Get pet with GET api request after DELETE
    const getAPIResponseAfterDelete = await request.get(`pet/${petId}`);

    console.log("======= GET RESPONSE CODE=======");
    console.log(getAPIResponseAfterDelete.status());
    expect(getAPIResponseAfterDelete.status()).toBe(404);
    expect(getAPIResponseAfterDelete).not.toBeNull();

    responseBody = await getAPIResponseAfterDelete.json();
    expect(responseBody.message).toBe("Pet not found");
});
