import { v4 as uuid } from 'uuid';
import { addDays, subDays, format } from 'date-fns';

const today = new Date();
const prevDay = subDays(today, 1);
const nextDay = addDays(today, 1);

const localStorageService = {
    /**
     * Get a time-log item from local storage with an id if exists.
     * @param id
     * @returns {any|null}
     */
    getTimeLog(id) {
        const timeLog = localStorage.getItem(id);
        return timeLog ? JSON.parse(timeLog) : null;
    },

    getAllTimeLogs(){
        let parsedItems = []
        for (let i = 0; i < localStorage.length; i++){
            const key = localStorage.key(i)
            parsedItems.push(this.getTimeLog(key))
        }
        return parsedItems
    },
    /**
     * Set a time-log item in the local storage with a non-existent uuid.
     * @param timeLog
     */
    setTimeLog(timeLog) {
        if(!this.getTimeLog(timeLog.id)){
            timeLog.id = uuid()
        }
        localStorage.setItem(timeLog.id, JSON.stringify(timeLog));
    },
    /**
     * Update an existing time-log.
     * @param newTimeLog
     * @returns {boolean}
     */
    updateTimeLog(newTimeLog) {
        const timeLog = this.getTimeLog(newTimeLog.id);
        if (timeLog) {
            const updatedTimeLog = { ...timeLog, ...newTimeLog };
            this.setTimeLog(updatedTimeLog);
            return true;
        }
        return false;
    },
    /**
     * Delete an existing time-log.
     * @param id
     * @returns {boolean}
     */
    deleteTimeLog(id) {
        if(localStorage.getItem(id)){
            localStorage.removeItem(id);
            return true;
        }
        return false;

    },
    /**
     * Populate local storage (database), if it is empty.
     */
    populateLocalStorage() {
        if (localStorage.length !== 0)
            return;

        this.setTimeLog({
            "id": uuid(),
            "date": format(prevDay,"yyyy-MM-dd"),
            "timeFrom": "10:00",
            "timeTo": "11:00",
            "description": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque" +
                " laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto" +
                " beatae vitae dicta sunt explicabo.",
            "tag":"project"
        })
        this.setTimeLog({
            "id": uuid(),
            "date": format(prevDay,"yyyy-MM-dd"),
            "timeFrom": "10:00",
            "timeTo": "11:00",
            "description": "Lorem Ipsum",
            "tag": "client"
        })
        this.setTimeLog({
            "id": uuid(),
            "date": format(nextDay,
                "yyyy-MM-dd"),
            "timeFrom": "10:00",
            "timeTo": "11:00",
            "description": "Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor" +
                " incididunt ut labore et dolore magna aliqua.",
            "tag":"client"})
        this.setTimeLog({
            "id": uuid(),
            "date": format(nextDay,"yyyy-MM-dd"),
            "timeFrom": "11:00",
            "timeTo": "12:00",
            "description": "Meeting",
            "tag":"project"
        })
    }
};

export default localStorageService;