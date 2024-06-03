const gameConfig = {
    gameType: process.env.GAME_TYPE || '',
    gameIdentifier: process.env.GAME_IDENTIFIER || '',
    gameTitle: process.env.GAME_TITLE || 'ScreenIdle',
    gameDatabaseRecordId: process.env.GAME_DATABASE_RECORD_ID || 'gameId',
    puzzleTitle: process.env.GAME_PUZZLE_TITLE || 'Guess the movie',
    colourBannerBackground: process.env.COLOUR_BANNER_BACKGROUND || '',
    colourBannerForeground: process.env.COLOUR_BANNER_FOREGROUND || '',
    revalidateCacheSeconds: process.env.REVALIDATE_CACHE_SECONDS || 0
}

export default gameConfig;