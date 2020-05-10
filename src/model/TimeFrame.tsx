export class TimeFrame {
    startDate: Date | undefined;
    endDate: Date | undefined;
    constructor(startDate: Date | undefined, endDate: Date | undefined) {
        this.startDate = startDate;
        this.endDate = endDate
    }

    setStartDate(startDate: Date) {
        this.startDate = startDate;
    }

    setEndDate(endDate: Date) {
        this.endDate = endDate;
    }

    getStartDate() {
        return this.startDate;
    }

    getEndDate() {
        return this.endDate;
    }
}