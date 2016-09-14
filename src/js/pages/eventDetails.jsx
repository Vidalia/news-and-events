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
    //TODO: need to check whether the user has already favourited this and have it start gold if already favourited instead of always starting grey
    starColour = { backgroundColor: "#e0e0e0"};
    event = null;
    this.getEvent();
    return {};
  },

  onRSSGet: function (data) {
    for (var i = 0; i < data.getElementsByTagName("Event").length; i++) {
      if (data.getElementsByTagName("Event")[i].getElementsByTagName("EventID")[0].innerHTML == id) {
        event = data.getElementsByTagName("Event")[i];
        console.log("more details");
        console.log(data.getElementsByTagName("Event")[i]);
      }
    }
    console.log("event...");
    console.log(event);
    console.log(id);
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

  resetHandler: function() {
    this.props.onClick();
  },

  favourite: function() {
    if (favourited) {
      favourited = false;
      console.log("Unfavourited");
      starColour = { backgroundColor: "#e0e0e0"};
    } else {
      favourited = true;
      console.log("Favourited");
      starColour = { backgroundColor: "#FFD700"};
    }
    this.forceUpdate();
  },

  render:function() {
    var loading = !event;
    console.log("event");
    console.log(event);

    if (!loading) {
      var title = event.getElementsByTagName("EventTitle")[0].innerHTML;
      var author = event.getElementsByTagName("author")[0].innerHTML;
      var startDateTime = event.getElementsByTagName("EventStartDateTime")[0].innerHTML;
      var venue = event.getElementsByTagName("EventVenue")[0].innerHTML;
      var campus = event.getElementsByTagName("EventCampus")[0].innerHTML;
      var type = event.getElementsByTagName("EventType")[0].innerHTML;
      var summary = event.getElementsByTagName("EventSummary")[0].innerHTML;
      var content = event.getElementsByTagName("EventContentClean")[0].innerHTML;
      var url = event.getElementsByTagName("EventURL")[0].innerHTML;

      author = this.nullCheck(author);
      startDateTime = this.nullCheck(startDateTime);
      venue = this.nullCheck(venue);
      campus = this.nullCheck(campus);
      type = this.nullCheck(type);
      summary = this.nullCheck(summary);

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
                  <Button onClick={this.favourite} id="secondaryButtonWing" style={starColour}>
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
