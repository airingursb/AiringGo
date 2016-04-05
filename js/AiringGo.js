var wins = [];
var count = 0;

for (var i = 0; i < 15; i++) {
    wins[i] = [];
    for (var j = 0; j < 15; j++) {
        wins[i][j] = []
    }
}

var myWin = [];
var airingWin = [];

for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i][j + k][count] = true;
        }
        count++;
    }
}

for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[j + k][i][count] = true;
        }
        count++;
    }
}

for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j + k][count] = true;
        }
        count++;
    }
}

for (var i = 0; i < 11; i++) {
    for (var j = 14; j > 3; j--) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j - k][count] = true;
        }
        count++;
    }
}

function airingGo() {
    if (over) {
        return;
    }

    var u = 0;
    var v = 0;
    var myScore = [];
    var airingScore = [];
    var max = 0;

    for (var i = 0; i < 15; i++) {
        myScore[i] = [];
        airingScore[i] = [];
        for (var j = 0; j < 15; j++) {
            myScore[i][j] = 0;
            airingScore[i][j] = 0;
        }
    }

    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if (chessBoard[i][j] == 0) {
                for (var k = 0; k < count; k++) {
                    if (wins[i][j][k]) {
                        if (myWin[k] == 1) {
                            myScore[i][j] += 200;
                        } else if (myWin[k] == 2) {
                            myScore[i][j] += 400;
                        } else if (myWin[k] == 3) {
                            myScore[i][j] += 2000;
                        } else if (myWin[k] == 4) {
                            myScore[i][j] += 10000;
                        }
                        if (airingWin[k] == 1) {
                            airingScore[i][j] += 220;
                        } else if (airingWin[k] == 2) {
                            airingScore[i][j] += 420;
                        } else if (airingWin[k] == 3) {
                            airingScore[i][j] += 2100;
                        } else if (airingWin[k] == 4) {
                            airingScore[i][j] += 20000;
                        }
                    }
                }
                if (myScore[i][j] > max) {
                    max = myScore[i][j];
                    u = i;
                    v = j;
                } else if (myScore[i][j] == max) {
                    if (airingScore[i][j] > airingScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }

                if (airingScore[i][j] > max) {
                    max  = airingScore[i][j];
                    u = i;
                    v = j;
                } else if (airingScore[i][j] == max) {
                    if (myScore[i][j] > myScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }

    oneStep(u, v, false);
    chessBoard[u][v] = 2;

    for (var k = 0; k < count; k++) {
        if (wins[u][v][k]) {
            airingWin[k] ++;
            myWin[k] = 6;
            if (airingWin[k] == 5) {
                window.alert("You Fail!");
                over = true;
            }
        }
    }

    if (!over) {
       me = !me;
    }

}

function airingGo2() {
    if (over) {
        return;
    }

    var u = 0;
    var v = 0;
    var myScore = [];
    var airingScore = [];
    var max = 0;

    for (var i = 0; i < 15; i++) {
        myScore[i] = [];
        airingScore[i] = [];
        for (var j = 0; j < 15; j++) {
            myScore[i][j] = 0;
            airingScore[i][j] = 0;
        }
    }

    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if (chessBoard[i][j] == 0) {
                for (var k = 0; k < count; k++) {
                    if (wins[i][j][k]) {
                        if (airingWin[k] == 1) {
                            airingScore[i][j] += 200;
                        } else if (airingWin[k] == 2) {
                            airingScore[i][j] += 400;
                        } else if (airingWin[k] == 3) {
                            airingScore[i][j] += 2000;
                        } else if (airingWin[k] == 4) {
                            airingScore[i][j] += 10000;
                        }
                        if (myWin[k] == 1) {
                            myScore[i][j] += 220;
                        } else if (myWin[k] == 2) {
                            myScore[i][j] += 420;
                        } else if (myWin[k] == 3) {
                            myScore[i][j] += 2100;
                        } else if (myWin[k] == 4) {
                            myScore[i][j] += 20000;
                        }
                    }
                }
                if (airingScore[i][j] > max) {
                    max = airingScore[i][j];
                    u = i;
                    v = j;
                } else if (airingScore[i][j] == max) {
                    if (myScore[i][j] > myScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }

                if (myScore[i][j] > max) {
                    max  = myScore[i][j];
                    u = i;
                    v = j;
                } else if (myScore[i][j] == max) {
                    if (airingScore[i][j] > airingScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }

    oneStep(u, v, true);
    chessBoard[u][v] = 1;

    for (var k = 0; k < count; k++) {
        if (wins[u][v][k]) {
            myWin[k] ++;
            airingWin[k] = 6;
            if (myWin[k] == 5) {
                window.alert("Win!");
                over = true;
            }
        }
    }

    if (!over) {
        me = !me;
    }

}
