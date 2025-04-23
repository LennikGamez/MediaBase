import { ref } from 'vue';

export default function useSleepTimer(seconds: number, callback: CallableFunction){
    const currentSleepTime = ref(seconds);
    const sleepTimerID = ref(0);

    function startSleepTimer(){
        sleepTimerID.value = setInterval(() => {
            currentSleepTime.value -= 1;
            console.log("sleep timer", currentSleepTime.value);
            if (currentSleepTime.value == 0){
                clearInterval(sleepTimerID.value);
                callback();
            }
        }, 1000);
    }

    function setSleepTimer(seconds: number){
        currentSleepTime.value = seconds;

        if (seconds == 0){
            clearInterval(sleepTimerID.value);
        }else{
            startSleepTimer();
        }
    }

    return {
        currentSleepTime,
        setSleepTimer
    }
}