interface Round {

}

interface GameState {
    teams: (string[2])[];
    rounds: Round[];

}

function generateInitialState(teamA: string[2], teamB: string[2]): GameState {
    return {
        teams: [teamA, teamB],
        rounds: [],
    };
}

function attemptWord(prevState: GameState, wordAttempt: string): GameState {


}
