 Feature: Verify whether the contact is updated  properly when the APM checkbox is disabled.


@APMDisEnabled
  Scenario: Uncheck the apm status checkbox in oracle
    When User navigates to the oracle application
    When User enter the username
    When User enter the password
    When User click on the login button
    When Search Interface security Account Sytems
    When Click on Profile Tab
    When Uncheck on APM checkbox
    When Click on Save
    
@APMDisEnabled
  Scenario: UPDATE A CONTACT IN DG ALARM PORTAL (DG-TEST2) TO VERIFY THE AUTOMATION
    When User navigates to the dgAlarmPortal application
    When Search a site
    When Click on Alarm Panel Code Change Request
    When Enter Passcode 
    When Click on submit
    When Edit a contact
    When Click on submit button
    When Verify Success Message

@APMDisEnabled
  Scenario: Check whether a SR is created in oracle
    When User navigates to the oracle application
    When User enter the username
    When User enter the password
    When User click on the login button
    When Search Interface security Account Sytems
    When Click on Service Request Tab
    When Check whether the SR is created
