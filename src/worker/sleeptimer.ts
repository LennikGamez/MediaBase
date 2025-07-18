import useSleepTimer from "../helper/sleeptimer"

self.onmessage = function (e) {
    if (e.data == "startTimer"){
        const {currentSleepTime, setSleepTimer, isActive} = useSleepTimer(15, ()=>self.postMessage({msg:"finished"}))
        setSleepTimer(20);
        self.postMessage(currentSleepTime)
    }
}
