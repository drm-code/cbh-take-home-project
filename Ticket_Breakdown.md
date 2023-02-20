# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket #1: [BE] Add "custom_id" column to "Agents" table in the database.

**`Description:`**

On "Agents" table, we need to add a new column called "custom_id" (string).

**`Acceptance Criteria:`**

- The column is filled by a value that will come from the FE.
- The column value is unique across the "Agents" table.
- If no value is received from the FE, we should use the internal database id.
- The column value is returned to the FE in the metadata response.

**`Implementation:`**

Create a new column of type string in the "Agents" table called "custom_id" as unique so database can validate that there is no duplicated value, the column will be filled with the payload from the FE in the body of the request there will be a field called "custom_id", if "custom_id" value already exist for another row in the database, we should return an error to the FE that says "This Custom ID already exists, please provide another value".

Return the new column in the metadata response for the FE.

**`Time/Effort estimate:`**

- 2 hours

### Ticket #2: [FE] Create "custom_id" field on Agents Details Page

**`Description:`**

On "Agents Details Page" we need to create a new field called "custom_id" (string) with the label "Custom ID".

**`Acceptance Criteria:`**

- The field is placed as the first field on the Form.
- The field is alphanumeric value.
- The field accepts an empty value.

**`Implementation:`**

Create a new field on `app/pages/Agent/components/AgentDetailsForm/AgentDetailsForm.tsx` component called "custom_id" with the label "Custom ID" that will be used as part of the payload to be sent to the api `POST /api/agent`.

The BE will validate if the value exists or not in the database, if so, an error message will be returned and will be shown to the user as a toastr notification.

Add the corresponding test cases when:

- No data for "custom_id" value is sent.
- The value sent is not unique.
- The value sent is unique.

**`Time/Effort estimate:`**

- 3 hours
