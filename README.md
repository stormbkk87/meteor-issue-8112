# meteor-issue-8112

git clone https://github.com/stormbkk87/meteor-issue-8112.git<br/>
cd meteor-issue-8112<br/>
meteor npm install<br/>

- Change the App ID to your test App ID in the mobile-config.js
- Instructions below or can use the URL below I followed to create a Voip Services certificate on developer.apple.com for your App ID

<pre><code>http://www.nikola-breznjak.com/blog/ios/create-native-ios-app-can-receive-voip-push-notifications/</code></pre>

- Create App ID on developer.apple.com
- Create CSR by going on Mac to Applications > Utilities > Keychain Access.app
- Click menu Keychain Access > Certificate Assistant > Request a Certificate From a Certificate Authority
- In the information window
  - User Email address, enter your email address
  - In the Common Name field, create a name for your private key
  - The CA Email Address field should be left empty
  - In the "Request is" group, select the "Saved to disk" option
  - Click Continue within the Keychain Access to complete the CSR generation process
- Create Voip Services Certificate for App ID on developer.apple.com
- Upload the CSR you just created
- Download certificate Apple generates
- Import cert into Mac Keychain by double clicking it
- You should see it under "My Certificates" in Keychain Access
- Right click the "Voip Services" certificate in Keychain access and select Export
- Select to save as a .p12 file to a folder where we'll test the voip push
- Navigate to the folder where you exported the .p12 file and run the following command on commandline

openssl pkcs12 -in YOUR_CERT.p12 -out VOIP.pem -nodes -clcerts

- Move the script "push_debug.py" from the git folder "private/scripts" to the same folder as the newly created VOIP.pem file
- Run meteor command with your local IP address, drop your firewall

meteor run ios-device --mobile-server http://192.x.x.x:3000

- Once XCode comes up, plugin iPhone with at least iOS 9, I used iPhone 6 iOS 10.0.2
- Under "General" set Signing Team
- Change Capabilities > Push Notifications > On
- Select real device, not simulator
- Choose menu Product > Run
- Once the app comes up, copy-paste the device id next to "credentials:" that comes up in the XCode debug console to the below command

python push_debug.py -s ./VOIP.pem "/<credentials-device-id/>"

- Run the above "push_debug.py" commandline script while phone is in foreground
- Note the UUID shown in the XCode debug console labeled "UUID". This is from the Swift code.
- Same UUID should show again in XCode debug console coming from Cordova javascript callback labeled "voipPushPayload"
- Lock iPhone to put app in suspend mode or put app in background
- Run the same "push_debug.py" script again
- Note the UUID will show in XCode debug console labeled "UUID" from the Swift code, but will not show the Cordova callback labeled "voipPushPayload"
- Run the same "push_debug.py" script again
- Note the UUID from the XCode debug console labeled "UUID"
- Notice that the XCode debug console from the Cordova javascript callback is not the current UUID but it is from the previous one
- Unlock the iPhone and start app again
- Notice that the UUID of the final voip push now shows up in the XCode debug console like it was in a queue waiting
- The result is that the UUID is always 1 behind in the Cordova callback console output, each successive voip push produces the previous UUID and not the current UUID.
 



