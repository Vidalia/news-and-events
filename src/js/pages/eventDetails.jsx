var React = require("-aek/react");
var Container = require("-components/container");
var {BasicSegment, Segment} = require("-components/segment");
var {AttachedLabel} = require("-components/label");
var Page = require("-components/page");
var Button = require("-components/button");
var $ = require("jquery");
var request = require("-aek/request");
var event, id, favourited, starColour, userInfo, username, prevAdded;

var EventDetails = React.createClass({

  //Setting the initial state of essential variables and running crucial functions needed for functionality.
  getInitialState: function() {
    this.onRSSGet = this.onRSSGet.bind(this);
    id = this.props.value;
    this.getEvent();

    prevAdded = false; //Has the user already added the event to thier calendar?

    if (prevAdded) {
      favourited = true;
      starColour = { backgroundColor: "#FFD700"};
    } else {
      favourited = false;
      starColour = {backgroundColor: "#e0e0e0"};
    }

    event = null;
    userInfo = JSON.parse(localStorage["cache_/campusm/sso/state"]).data;
    username = userInfo.serviceUsername_363;

    return {};
  },

  //Requests and passes the xml feed into the onRSSGet function for the data to be collected.
  getEvent: function() {
    var RSS = "https://www.essex.ac.uk/news/eventPocketEssexFeed.xml";
    $.get(RSS, this.onRSSGet);
  },

  //Getting specific event xml and updating the state of the screen to employ it.
  onRSSGet: function (data) {
    for (var i = 0; i < data.getElementsByTagName("Event").length; i++) {
      if (data.getElementsByTagName("Event")[i].getElementsByTagName("EventID")[0].innerHTML === id) {
        event = data.getElementsByTagName("Event")[i];
      }
    }
    this.forceUpdate();
  },

  //Checking if variables initialised with xml data are null or empty and if so return 'N/A' otherwise return the variable.
  nullCheck: function(variable) {
    if (variable == null || variable == undefined || variable == "" || variable == " ") {
      return "N/A";
    } else {
      return variable;
    }
  },

  addEventToCalendar: function() {
    //Getting this error with the below commented out code:
    //No 'Access-Control-Allow-Origin' header is present on the requested resource.
    // var RSS = "http://www.essex.ac.uk/campusm/ews/AddEventToCalendar.ashx";
    // console.log("RSS check");
    // console.log(RSS);
    // $.get(RSS, this.onRSSGet);

    request.action("EVENTFEED")
    .send({EID: {id}, UID: {username}})
    .end((error, response) => {
      if (error) {
        return console.error(error);
      } else {
        return console.log(response);
      }
    });
  },

  //Closes the popup and re-enables the functionality of the app, also allowing all changes made by the favourite button to be kept.
  ok: function() {
    document.getElementById("disabler").style.display = "none";
    document.getElementById("doubleCheck").style.display = "none";
    this.addEventToCalendar();
  },

  //Closes the popup and re-enables the functionality of the app, whilst reverting all changes made by the favourite button.
  //Currently there is no plan for the user to be able to remove the event from thier calendar.
  //To set up the ability for students to take events off of their calendars uncomment the if and implement a webservice that removes events
  cancel: function() {
    document.getElementById("disabler").style.display = "none";
    document.getElementById("doubleCheck").style.display = "none";
    // if (favourited) {
    //   starColour = { backgroundColor: "#e0e0e0"};
    //   favourited = false;
    // } else {
    //   starColour = { backgroundColor: "#FFD700"};
    //   favourited = true;
    // }
    starColour = { backgroundColor: "#e0e0e0"};
    favourited = false;
    this.forceUpdate();
  },

  //Calls on a parent function to reset the screen and return the user to all events
  resetHandler: function() {
    this.props.onClick();
  },

  //When user clicks favourite the popup is opened and all other parts are disabled until the user confirms or cancels the favourite.
  //To set up the ability for students to take events off of their calendars uncomment the if block
  favourite: function() {
    // if (favourited) {
    //   favourited = false;
    //   starColour = { backgroundColor: "#e0e0e0"};
    // } else {
    //   favourited = true;
    //   starColour = { backgroundColor: "#FFD700"};
    // }

    if (!favourited) {
      document.getElementById("disabler").style.display = "inline";
      document.getElementById("doubleCheck").style.display = "inline";
      favourited = true;
      starColour = { backgroundColor: "#FFD700"};
    }
    this.forceUpdate();
  },

  render:function() {
    var loading = !event;

    //Checking whether the data for the current event has been retrieved or if the app is still loading.
    if (!loading) {
      //Retrieving all relevant xml data from the current event and assigning it to the corresponding variable.
      var title = event.getElementsByTagName("EventTitle")[0].innerHTML;
      var author = event.getElementsByTagName("author")[0].innerHTML;
      var startDateTime = event.getElementsByTagName("EventStartDateTime")[0].innerHTML;
      var venue = event.getElementsByTagName("EventVenue")[0].innerHTML;
      var campus = event.getElementsByTagName("EventCampus")[0].innerHTML;
      var type = event.getElementsByTagName("EventType")[0].innerHTML;
      var summary = event.getElementsByTagName("EventSummary")[0].innerHTML;
      var content = event.getElementsByTagName("EventContentClean")[0].innerHTML;
      var url = event.getElementsByTagName("EventURL")[0].innerHTML;

      //Performing a null check on variables holding non-essential data.
      author = this.nullCheck(author);
      startDateTime = this.nullCheck(startDateTime);
      venue = this.nullCheck(venue);
      campus = this.nullCheck(campus);
      type = this.nullCheck(type);
      summary = this.nullCheck(summary);

      //If the xml data was successfully retrieved then display a page that presents all of the relevant data.
      return (
        <Page style={{paddingBottom:"14px"}}>
          <Container>
            <Segment style={{padding:"0", margin:"14px"}}>
              <AttachedLabel style={{position:"relative"}} top><h3 id="detailsLabel">{title}</h3></AttachedLabel>
              <br/>
              <Segment id="info">
                <p><b>Author: </b>{author}</p>
                <p><b>Start Date: </b>{startDateTime}</p>
                <p><b>Venue: </b>{venue}</p>
                <p><b>Campus: </b>{campus}</p>
                <p><b>Event Type: </b>{type}</p>
                <p><b>Summary:</b></p>
                {summary}
                <div className="ui divider"/>
                <div id="doubleCheck">
                  <p>Are you sure you want to add this event to your personal calendar?</p>
                  <p style={{fontSize:"10px", marginBottom:"0"}}>These events are subject to change and the original event page should be checked for any changes.</p>
                  <br/>
                  <div>
                    <Button onClick={this.ok} className="checkButton">OK</Button>
                    <Button onClick={this.cancel} className="checkButton" style={{marginLeft:"20px"}}>Cancel</Button>
                  </div>
                </div>
                <b>Event Desciption:</b>
                <p>{content}</p>
                For more information please visit the university's event website.
                <div className="ui icon buttons maxWidth">
                  <Button onClick={this.resetHandler} id="secondaryButtonWing">
                    <i style={{paddingRight:"5px"}} className="arrow left icon"></i>
                    Back
                  </Button>
                  <Button href={url} id="secondaryButtonCenter">
                    Visit Event Website
                  </Button>
                  <Button href="#doubleCheck" data-rel="popup" onClick={this.favourite} id="secondaryButtonWing" style={starColour}>
                    Favourite
                    <i style={{paddingLeft:"5px"}} className="star icon" iconRight></i>
                  </Button>
                </div>
              </Segment>
            </Segment>
          </Container>
          <Segment id="disabler"></Segment>
        </Page>
      );
    } else {
      //If the xml data is unable to be retrieved, then display content not reliant on the data that notifies the user of the missing data.
      return (
        <Container>
          <BasicSegment>
            <Segment>
              <AttachedLabel top left>Event not available</AttachedLabel>
              <Segment>
                <h3 id="warning">This event does not appear to have any information at this time. Please check back at a later date.</h3>
              </Segment>
            </Segment>
            <Button fluid onClick={this.resetHandler}>
              <i style={{paddingRight:"5px"}} className="arrow left icon"></i>
              Back
            </Button>
          </BasicSegment>
        </Container>
      );
    }
  }
});

module.exports = EventDetails;
