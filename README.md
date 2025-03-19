# kikuo-pv-link-mailer
Google Appscript code to send a mail to people which contains: A randomly generated Kikuo song name, its associated youtube link, and a thumbnail.

## How to use
Copy-paste this code in an Appscript file, and edit the "YOUR EMAIL HERE" on line 18 of sendKikuoMail.gs to include your target email instead (inside the quotes).
Save it and authorise the application with the Google account you want to use to send the email.
Set a trigger to execute this code according to your preferred frequency, so that you can receive a mail at your specified frequency. 

## API used
I used VocaDB's API to make requests and fetch song details.

## Future potential
Can connect it to a spreadsheet so that a list of emails can be collected and bulk-emails can be sent instead of just one or hardcoding it.
