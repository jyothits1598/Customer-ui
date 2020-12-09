export interface TimeAvailability {
    id: number;
    day: string;
    startTime: string;
    endTime: string;
    markedAsClose: boolean;
}



export function TimeAvailabilityComp(first: TimeAvailability, second: TimeAvailability) {
    const dayValue = {
        monday: 1
        , tuesday: 2
        , wednesday: 3
        , thursday: 4
        , friday: 5
        , saturday: 6
        , sunday: 7
    }

    //are first and second different days
    if (dayValue[first.day] - dayValue[second.day]) return dayValue[first.day] - dayValue[second.day];

    //compare start-times
    let firstSTime = new Date('1/1/0001 ' + first.startTime.substr(0, 5) + ':00 ' + first.startTime.substr(5, 2)).getTime();
    let secondSTime = new Date('1/1/0001 ' + second.startTime.substr(0, 5) + ':00 ' + second.startTime.substr(5, 2)).getTime();

    if (firstSTime !== secondSTime) return firstSTime - secondSTime;

    //compare end-times
    let firstETime = new Date('1/1/0001 ' + first.endTime.substr(0, 5) + ':00 ' + first.endTime.substr(5, 2)).getTime();
    let secondETime = new Date('1/1/0001 ' + second.endTime.substr(0, 5) + ':00 ' + second.endTime.substr(5, 2)).getTime();

    return firstETime - secondETime;
}

export function ReadAvailability(availabilityBackend: any): Array<TimeAvailability> {
    let result: Array<TimeAvailability> = []
    for (const a in availabilityBackend) {
        let newAvai = <TimeAvailability>{
            id: availabilityBackend[a].menu_timings_id,
            day: availabilityBackend[a].days,
            //padding if time is not in format
            startTime: availabilityBackend[a].start_time.length === 6 ? (availabilityBackend[a].start_time) : availabilityBackend[a].start_time,
            endTime: availabilityBackend[a].end_time.length === 6 ? (availabilityBackend[a].end_time) : availabilityBackend[a].end_time,
            markedAsClose: (availabilityBackend[a].marked_as_closed ? true : false)
        };
        result.push(newAvai)
    }
    result.sort(TimeAvailabilityComp);
    return result;
}

export function AvailabilityToBackend(availability: Array<TimeAvailability>): Array<any> {
    let data = [];
    availability.forEach((a) => {
        let menuTime: any = {};
        menuTime.days = a.day;
        menuTime.start_time = a.startTime;
        menuTime.end_time = a.endTime;
        menuTime.marked_as_closed = a.markedAsClose;
        // menuTime.active_flag = 0;
        data.push(menuTime);
    })
    return data;
}
