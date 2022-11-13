describe("Creating go boards", function () {
  it("9x9", function () {
    let board = [
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
    ];

    let game = new Go(9);
    Test.assertDeepEquals(game.board, board, "Should generate a 9 by 9 board.");
  });
  it("13x13", function () {
    let board = [
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    ];

    let game = new Go(13);
    Test.assertDeepEquals(game.board, board, "Should generate a 13 by 13 board.");
  });
  it("19x19", function () {
    let board = [
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    ];

    let game = new Go(19);
    Test.assertDeepEquals(game.board, board, "Should generate a 19 by 19 board.");
  });

  it("32x32", function () {
    Test.expectError(
      "game.create(32) should throw an error. Board cannot be larger than 25 by 25.",
      () => new Go(32)
    );
  });
});

describe("Placing stones", function () {
  let game = new Go(9);
  it("Place a black stone", function () {
    game.move("3D");
    Test.assertEquals(game.getPosition("3D"), "x");
  });
  it("Place a white stone", function () {
    game.move("4D");
    Test.assertEquals(game.getPosition("4D"), "o");
  });
  it("Can take multiple moves at a time.", function () {
    let game = new Go(9);
    console.log(game.board);
    game.move("4A", "5A", "6A");
    console.log(game.board);
    Test.assertEquals(game.getPosition("4A"), "x");
    Test.assertEquals(game.getPosition("5A"), "o");
    Test.assertEquals(game.getPosition("6A"), "x");
  });
  it("Cannot place a stone on an existing stone. Throws an error.", function () {
    Test.expectError("3D Should be an invalid move", () => game.move("3D"));
    Test.expectError("4D Should be an invalid move", () => game.move("4D"));
  });
  it("Cannot place a stone with out of bounds coordinates. Throws an error.", function () {
    Test.expectError("3Z Should be an invalid move", () => game.move("3Z"));
    Test.expectError("66 Should be an invalid move", () => game.move("66"));
  });
});

describe("Capturing", function () {
  it("Black captures single white stone", function () {
    let game = new Go(9);
    let moves = ["4D", "3D", "4H", "5D", "3H", "4C", "5B", "4E"];
    game.move(...moves);

    Test.assertEquals(game.getPosition("4D"), ".");
  });

  it("Black captures multiple white stones", function () {
    let game = new Go(9);
    let moves = [
      "6D",
      "7E",
      "6E",
      "6F",
      "4D",
      "5E",
      "5D",
      "7D",
      "5C",
      "6C",
      "7H",
      "3D",
      "4E",
      "4F",
      "3E",
      "2E",
      "3F",
      "3G",
      "2F",
      "1F",
      "2G",
      "2H",
      "1G",
      "1H",
      "4C",
      "3C",
      "6H",
      "4B",
      "5H",
      "5B",
    ];
    let captured = ["6D", "6E", "4D", "5D", "5C", "4E", "3E", "3F", "2F", "2G", "1G", "4C"];
    game.move(...moves);
    captured.forEach((capture) => {
      Test.assertEquals(game.getPosition(capture), ".");
    });
  });

  it("Corner capture", function () {
    let game = new Go(9);
    let moves = ["9A", "8A", "8B", "9B"];
    game.move(...moves);
    Test.assertEquals(game.getPosition("9A"), ".");
  });

  it("Multiple captures", function () {
    let game = new Go(9);
    let moves = [
      "5D",
      "5E",
      "4E",
      "6E",
      "7D",
      "4F",
      "7E",
      "3E",
      "5F",
      "4D",
      "6F",
      "6D",
      "6C",
      "7F",
      "4E",
      "5E",
    ];
    let captured = ["4E", "6D", "6E"];
    game.move(...moves);
    captured.forEach((capture) => {
      Test.assertEquals(game.getPosition(capture), ".");
    });
  });

  it("Snapback", function () {
    let game = new Go(5);
    let moves = [
      "5A",
      "1E",
      "5B",
      "2D",
      "5C",
      "2C",
      "3A",
      "1C",
      "2A",
      "3D",
      "2B",
      "3E",
      "4D",
      "4B",
      "4E",
      "4A",
      "3C",
      "3B",
      "1A",
      "4C",
      "3C",
    ];
    let captured = ["4A", "4B", "4C", "3B"];
    game.move(...moves);
    captured.forEach((capture) => {
      Test.assertEquals(game.getPosition(capture), ".");
    });
  });

  it("Self-capturing throws an error.", function () {
    let game = new Go(9);
    let moves = ["4H", "8A", "8B", "9B", "9A"];
    Test.expectError("self capturing moves are illegal", () => game.move(...moves));
    Test.assertEquals(game.getPosition("9A"), ".", "Illegal stone should be removed");
    game.move("3B");
    Test.assertEquals(game.getPosition("3B"), "x", "Black should have another try.");
  });
});

describe("KO Rule", function () {
  it("Illegal KO by white", function () {
    let game = new Go(5);
    let moves = ["5C", "5B", "4D", "4A", "3C", "3B", "2D", "2C", "4B", "4C", "4B"];
    Test.expectError("Illegal KO move. Should throw an error.", () => game.move(...moves));
    game.move("2B");
    Test.assertEquals(game.getPosition("2B"), "x", "Black should be given another try to place their stone.");
    Test.assertEquals(game.getPosition("4B"), ".", "Should rollback game to before illegal move was made.");
  });
});

describe("Handicap stones", function () {
  it("Three handicap stones on 9x9", function () {
    let game = new Go(9);
    let finalBoard = [
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "x", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "x", ".", ".", ".", "x", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
    ];

    game.handicapStones(3);
    Test.assertDeepEquals(game.board, finalBoard);
  });
});

describe("Misc", function () {
  let game = new Go(9, 16);
  it("Can get board size", function () {
    Test.assertDeepEquals(game.size, { height: 9, width: 16 });
  });
  it("Can get color of current turn", function () {
    let game = new Go(9);
    game.move("3B");
    Test.assertEquals(game.turn, "white");
    game.move("4B");
    Test.assertEquals(game.turn, "black");
  });
  it("Can rollback a set number of turns", function () {
    let game = new Go(9);
    let board = [
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
    ];
    game.move("3B", "2B", "1B");
    game.rollback(3);
    Test.assertDeepEquals(game.board, board);
  });
  it("Can pass turn", function () {
    let game = new Go(9);
    game.pass();
    Test.assertEquals(game.turn, "white");
  });
  it("Can reset the board", function () {
    let game = new Go(9);
    let board = [
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", "."],
    ];

    game.move("3B", "2B", "1B");
    game.reset();
    Test.assertDeepEquals(game.board, board);
    Test.assertEquals(game.turn, "black");
  });
});
