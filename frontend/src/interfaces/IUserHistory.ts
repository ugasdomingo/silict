export interface IUserHistory {
    _id: string;
    uid: string;
    startedService: string[];
    finishedService: string[];
    enrollmentId: string[];
    savesGoals: {
        goal: string[];
        amount: number[];
    };
    affiliation: {
        initialDate: Date[];
        affiliationId: string[];
    };
    endAffiliation: Date;
    saves: {
        saveId: string[];
        amount: number[];
    };
    rewardsPointsEarned: number;
    rewardsPointsUsed: number;
    rewardsTypes: string[];
    createdAt: Date;
    updatedAt: Date;
}
