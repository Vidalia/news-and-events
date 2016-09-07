var React = require("-aek/react");
var Container = require("-components/container");
var {BasicSegment, Segment} = require("-components/segment");
var {AttachedLabel} = require("-components/label");
var Page = require("-components/page");
var Button = require("-components/button");
var $ = require("jquery");
var event, id, favourited, starColour;

var EventDetails = React.createClass({

  getInitialState: function() {
    this.onRSSGet = this.onRSSGet.bind(this);
    id = this.props.value;
    favourited = false;
    starColour = "#FFD700";
    return {};
  },

  componentDidMount: function() {
    this.getEvent();
  },

  onRSSGet: function (data) {
    for (var i = 0; i < data.getElementsByTagName("Event").length; i++) {
      if (data.getElementsByTagName("Event")[i].getElementsByTagName("EventID")[0].innerHTML == id) {
        event = data.getElementsByTagName("Event")[i];
      }
    }
    this.forceUpdate();
  },

  getEvent: function() {
    var RSS = "https://www.essex.ac.uk/news/eventPocketEssexFeed.xml";
    $.get(RSS, this.onRSSGet);
  },

  nullCheck: function(variable) {
    if (variable == null || variable == undefined || variable == "" || variable == " ") {
      return "N/A";
    } else {
      return variable;
    }
  },

  goBack: function() {
    //this.forceUpdate();
    console.log("print but why");
  },

  favourite: function() {
    if (favourited) {
      favourited = false;
      console.log("Unfavourited");
    } else {
      favourited = true;
      console.log("Favourited");
    }
  },

  render:function() {
    var loading = !event;

    console.log("motherfucker");

    console.log(event);
    console.log(loading);
    if (!loading) {
      console.log("not loading");
      var title = event.getElementsByTagName("EventTitle")[0].innerHTML;
      var author = event.getElementsByTagName("author")[0].innerHTML;
      var startDateTime = event.getElementsByTagName("EventStartDateTime")[0].innerHTML;
      //var endDateTime = event.getElementsByTagName("EventEndDateTime")[0].innerHTML;
      //<p>End Date: {endDateTime}</p>
      var venue = event.getElementsByTagName("EventVenue")[0].innerHTML;
      var campus = event.getElementsByTagName("EventCampus")[0].innerHTML;
      var type = event.getElementsByTagName("EventType")[0].innerHTML;
      var summary = event.getElementsByTagName("EventSummary")[0].innerHTML;
      var content = event.getElementsByTagName("EventContentClean")[0].innerHTML;
      var url = event.getElementsByTagName("EventURL")[0].innerHTML;

      //if (favourite) {
        //star = <div className="ui primary"><i onClick={this.onClick()} className="star icon" style={{background:"#FFD700"}}></i></div>;
      //} else {
        //star = <div className="ui primary"><i onClick={this.onClick()} className="empty star icon"></i></div>;
      //}

      // console.log("hey");
      // console.log(document.getElementById('title').offsetHeight);
      // if (document.getElementById('title').offsetHeight > 10) {
      //   //
      // }

      console.log(event);
      console.log("author before:");
      console.log(author);
      author = this.nullCheck(author);
      console.log("author after:");
      console.log(author);

      return (
        <Page>
          <Container>
            <Segment style={{margin:"14px"}}>
              <AttachedLabel id="title" top><h3>{title}</h3></AttachedLabel>
              <br/>
              <Segment>
                <p>Author: {author}</p>
                <p>Start Date: {startDateTime}</p>
                <p>Venue: {venue}</p>
                <p>Campus: {campus}</p>
                <p>Event Type: {type}</p>
                <p>Summary: {summary}</p>
                <hr/>
                <p>{content}</p>
                <div style={{width:"100%"}} className="ui icon buttons">
                  <Button onClick={this.goBack} style={{marginTop:"20px", width:"25%"}}>
                    <i style={{paddingRight:"5px"}} className="arrow left icon"></i>
                    Back
                  </Button>
                  <Button href={url} style={{marginTop:"20px", width:"50%"}}>
                    Visit Event Website
                  </Button>
                  <Button onClick={this.favourite} style={{marginTop:"20px", background:{starColour}, width:"25%"}}>
                    Favourite
                    <i style={{paddingLeft:"5px"}} className="star icon" iconRight></i>
                  </Button>
                </div>
              </Segment>
            </Segment>
          </Container>
        </Page>
      );
    } else {
      return (
        <Container>
          <BasicSegment>
            <AttachedLabel top left>Event Najme</AttachedLabel>
            <Segment>
              <h3>This event does not appear to have any information at this time. Please check back at a later date.</h3>
            </Segment>
          </BasicSegment>
        </Container>
      );
    }
  }
});

module.exports = EventDetails;
