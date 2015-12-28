
PartyBox
========
<i>Web based control of the Xbox Rockband Stage Kit using NodeJS</i>
<br>


Motivation:
-----------
I created this in hopes of entertaining guests at party I hosted during the Christmas holiday. I had an old <a href="https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&es_th=1&ie=UTF-8#q=rockband%20stage%20kit&es_th=1">Xbox Rockband Stage Kit</a> laying around that I was hoping I could use independently of the Xbox. This app basically allows you to run the Xbox Rockband Stage Kit (Light/Strobe/Fog Machine) using any Linux distribution running NodeJS. Its web based, so I can be controlled using any device using a web browser (supports mobile phones too).

  The Node.js backend was hosted on a Raspberry Pi 2 with good great results. Due to the time crunch of working on this two days before the holiday, this is probably not considered full featured release. Also, there may be a few commands/code I did not implement or failed implement correctly. Doesn't matter, however, my goal was achieved and my party was a huge success. The Rockband kit added an element to the party that took things up a notch or two.


What's needed:
--------------

  Any Linux Distro (probably windows too with a little bit of work)<br>
  NodeJS (and npm depdenancies)<br>
  This project uses the Stage Kit API found here: https://github.com/jummama/stagekit<br>


How to run:
-----------
  Clone this repo:
  <code>$ git clone https://github.com/davidmroth/PartyBox</code><br>
  To install all nodejs dependant modules: <code>npm install</code><br>
  Start Node.js manually: <code>npm start</code> or run the script in the root of the project folder: <code>./start.sh</code>


<br>
<br>
<br>

Please feel free to send pull request (big or small)
