import { Ref, ref, toRef } from 'vue';

export default function useSleepTimer(seconds: number, callback: CallableFunction){
    const currentSleepTime = ref(seconds);
    const sleepTimerID = ref(-1);
    const active = ref(false);

    function startSleepTimer(){
        if (sleepTimerID.value != -1) return;
        sleepTimerID.value = setInterval(() => {
            currentSleepTime.value -= 1;
            fetch("http://192.168.178.83:3000/ping")
            console.log("sleep timer", currentSleepTime.value);
            if (currentSleepTime.value == 0){
                clearInterval(sleepTimerID.value);
                sleepTimerID.value = -1;
                active.value = false;
                callback();
            }
        }, 1000);
        active.value = true;
    }

    function setSleepTimer(seconds: number | Ref<number>){
        currentSleepTime.value = toRef(seconds).value;
        if (seconds == 0){
            clearInterval(sleepTimerID.value);
            active.value = false;
        }else{
            startSleepTimer();
        }
    }

    function isActive(): Ref<boolean>{
        return active;
    }

    return {
        currentSleepTime,
        setSleepTimer,
        isActive
    }
}
