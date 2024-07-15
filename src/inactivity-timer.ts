
export default class InactivityTimer {
    private callBack: CallableFunction;
    private restartCallback: CallableFunction;
    private timeOutTime: number;
    private inactive: boolean;
    private id: ReturnType<typeof setTimeout>;
    constructor(callBack: CallableFunction, restartCallback: CallableFunction, timeOutTime: number = 2000){
        this.inactive = false;
        this.callBack = callBack;
        this.restartCallback = restartCallback;
        this.timeOutTime = timeOutTime;
        this.start();
    }

    start(){
        this.restartCallback();
        this.inactive = false;
        this.id = setTimeout(()=>{this.inactive = true; this.callBack();}, this.timeOutTime);
    }

    stop(){
        clearTimeout(this.id);
    }
    restart(){
        this.stop();
        this.start();
    }

    isActive(){
        return !this.inactive;
    }
}