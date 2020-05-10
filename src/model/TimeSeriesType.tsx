export class TimeSeriesType {
    public static readonly TIME_SERIES_DAILY = new TimeSeriesType('TIME_SERIES_DAILY', 'Time Series (Daily)');
    public static readonly TIME_SERIES_MONTHLY = new TimeSeriesType('TIME_SERIES_MONTHLY', 'Monthly Time Series');

    private constructor(public readonly key: string, public readonly displayName: string) {
    }
};