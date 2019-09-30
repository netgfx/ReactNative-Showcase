@echo on

adb devices -l | adb reverse tcp:8081 tcp:8081

@pause