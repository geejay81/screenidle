"use client"

import { IHistoryState } from "@/types/History";
import { getHistoryState } from "../client-lib/state-manager";
import { headings } from "@/ui/fonts";
import { GameTypes } from "@/types/GameTypes";

type GameHistoryProps = {
    gameType: GameTypes
}

export default function GameHistory({gameType}: GameHistoryProps) {

    const historyStats: IHistoryState = getHistoryState(gameType);

    return (
        (historyStats.gamesPlayed == 0 || historyStats.previousGame < 10)
            ? <></>
            : <div className="p-6 rounded-lg bg-screenidle-warning text-screenidle-link space-y-4">
            <h2 className={`text-2xl font-bold ${headings.className}`}>Box Office Hit?</h2>
            <dl className="max-w-md text-slate-900 grid grid-cols-2 gap-4">
                <div>
                    <dt className="mb-1 text-slate-800 md:text-lg text-center">Current streak</dt>
                    <dd className="text-xl3 font-semibold text-center">{historyStats.currentStreak}</dd>
                </div>
                <div>
                    <dt className="mb-1 text-slate-800 md:text-lg text-center">Max streak</dt>
                    <dd className="text-xl3 font-semibold text-center">{historyStats.maxStreak}</dd>
                </div>
                <div>
                    <dt className="mb-1 text-slate-800 md:text-lg text-center">Games won</dt>
                    <dd className="text-xl3 font-semibold text-center">{historyStats.gamesWon}/{historyStats.gamesPlayed}</dd>
                </div>
                <div>
                    <dt className="mb-1 text-slate-800 md:text-lg text-center">Games won</dt>
                    <dd className="text-xl3 font-semibold text-center">{historyStats.winPercentage.toFixed(2)}%</dd>
                </div>
            </dl>
        </div>
    );
}