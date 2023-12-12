export interface CalculatedBytes {
  /** Size in bytes without any transformation */
  originalBytesize: number;
  calculatedSize: number;
  calculatedMesure: BytesMeasures;
}
export interface CalculatedTime {
  /** Size in bytes without any transformation */
  originalMilli: number;
  calculatedTime: number;
  calculatedMeasure: TimeMeasures;
}

export type BytesMeasures = 'bytes' | 'KB' | 'MB' | 'GB';
export type TimeMeasures = 'ms' | 'sec' | 'min' | 'hr';

export class UtilityService {
  public static readonly getNonce = () => {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  //TODO: Move interfaces to the fetch.interface.ts

  /**
   * Receive a string and will return the bytesize of that string
   * @param text string to calculate his byte size
   * @param decimals number of decimals to use
   * @returns object with all the calculations
   */
  public static getByteSize(text: string, decimals: number): CalculatedBytes {
    const measures: {
      max: number;
      measure: BytesMeasures;
    }[] = [
      { max: 1024, measure: 'bytes' },
      { max: 1048576, measure: 'KB' },
      { max: 1073741824, measure: 'MB' },
      { max: Infinity, measure: 'GB' }
    ];
    const response: CalculatedBytes = {
      originalBytesize: new TextEncoder().encode(text).length,
      calculatedSize: 0,
      calculatedMesure: 'bytes'
    };

    for (const { max, measure } of measures) {
      if (response.originalBytesize < max) {
        response.calculatedSize = parseFloat(
          (response.originalBytesize / (max / 1024)).toFixed(decimals)
        );
        response.calculatedMesure = measure;
        break;
      }
    }
    return response;
  }

  /**
   * Calculate the time duration between 2 dates in milliseconds, seconds, minutes or hours.
   * @param date1
   * @param date2
   * @param decimals
   * @returns
   */
  public static getEllapsedTime(date1: Date, date2: Date, decimals: number) {
    const measures: { max: number; measure: TimeMeasures; divider: number }[] =
      [
        { max: 1000, measure: 'ms', divider: 1 },
        { max: 60 * 1000, measure: 'sec', divider: 1000 },
        { max: 60 * 60 * 1000, measure: 'min', divider: 60 * 1000 },
        { max: Infinity, measure: 'hr', divider: 60 * 60 * 1000 }
      ];

    const diffInMilli = Math.abs(date1.getTime() - date2.getTime());

    const response: CalculatedTime = {
      originalMilli: diffInMilli,
      calculatedTime: 0,
      calculatedMeasure: 'ms'
    };

    const measure = measures.find((m) => diffInMilli < m.max);
    if (measure) {
      response.calculatedTime = parseFloat(
        (diffInMilli / measure.divider).toFixed(decimals)
      );
      response.calculatedMeasure = measure.measure;
    }

    return response;
  }
}
