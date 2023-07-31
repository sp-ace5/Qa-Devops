const { Builder, Browser, By, until } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
  await driver.quit();
});

describe("Duel Duo tests", () => {
  test("page loads with title", async () => {
    await driver.get("http://localhost:3000");
    await driver.wait(until.titleIs("Duel Duo"), 1000);
  });

  test("clicking an 'Add to Duo' button displays the div with id = 'player-duo'", async () => {
    await driver.get("http://localhost:3000");

    const drawButton = await driver.findElement(By.id("draw"));
    await drawButton.click();

    const addToDuoButton = await driver.findElement(By.class("bot-btn"));
    await addToDuoButton.click();

    const playerDuoDiv = await driver.findElement(By.id("player-duo"));
    const isPlayerDuoDivDisplayed = await playerDuoDiv.isDisplayed();
    expect(isPlayerDuoDivDisplayed).toBeTruthy();
  });

  test("when a bot is 'Removed from Duo', it goes back to the id = 'choices'", async () => {
    await driver.get("http://localhost:3000");

    const drawButton = await driver.findElement(By.id("draw"));
    await drawButton.click();

    const addToDuoButton = await driver.findElement(By.id("bot-btn"));
    await addToDuoButton.click();

    const removeFromDuoButton = await driver.findElement(By.class("bot-btn"));
    await removeFromDuoButton.click();

    const choicesDiv = await driver.findElement(By.id("choices"));
    const isChoicesDivDisplayed = await choicesDiv.isDisplayed();
    expect(isChoicesDivDisplayed).toBeTruthy();
  });


});

