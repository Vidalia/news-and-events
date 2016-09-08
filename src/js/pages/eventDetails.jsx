var React = require("-aek/react");
var Container = require("-components/container");
var {BasicSegment, Segment} = require("-components/segment");
var {AttachedLabel} = require("-components/label");
//var {AekReactRouter,RouterView} = require("-components/router");
var Page = require("-components/page");
var Button = require("-components/button");
var $ = require("jquery");
var event, id, favourited, starColour;

//var router = new AekReactRouter();
var EventsPage = require("./events");

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
    EventsPage.refresh();
    console.log("print but why");
    //router.goto()
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
        <Page>
          <Container>
            <Segment style={{padding:"0", margin:"14px"}}>
              <AttachedLabel style={{position:"relative"}} top><h3 id="detailsLabel">{title}</h3></AttachedLabel>
              <br/>
              <Segment id="info">
                <p>Author: {author}</p>
                <p>Start Date: {startDateTime}</p>
                <p>Venue: {venue}</p>
                <p>Campus: {campus}</p>
                <p>Event Type: {type}</p>
                <p>Summary:</p>
                {summary}
                <div className="ui divider"/>
                Event Desciption:
                <p>{content}</p>
                For more information please visit the university's event website.
                <div className="ui icon buttons maxWidth">
                  <Button onClick={this.goBack} id="secondaryButtonWing">
                    <i style={{paddingRight:"5px"}} className="arrow left icon"></i>
                    Back
                  </Button>
                  <Button href={url} id="secondaryButtonCenter">
                    Visit Event Website
                  </Button>
                  <Button onClick={this.favourite} id="secondaryButtonWing" style={{background:{starColour}}}>
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
