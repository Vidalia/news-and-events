var React = require("-aek/react");
var Container = require("-components/container");
var {BasicSegment, Segment} = require("-components/segment");
var {AttachedLabel} = require("-components/label");
var Page = require("-components/page");
var Button = require("-components/button");
var $ = require("jquery");
var event, id, favourite, star;

var EventDetails = React.createClass({

  getInitialState: function() {
    this.onRSSGet = this.onRSSGet.bind(this);
    id = this.props.value;
    favourite = false;
    console.log(id);
    console.log("fak");
    return {};
  },

  componentDidMount: function() {
    this.getEvent();
  },

  onRSSGet: function (data) {
    console.log("right ere m8");
    console.log(data);
    for (var i = 0; i < data.getElementsByTagName("Event").length; i++) {
      console.log("--------------------");
      console.log(data.getElementsByTagName("Event")[i].getElementsByTagName("EventID")[0].innerHTML);
      console.log(id);
      if (data.getElementsByTagName("Event")[i].getElementsByTagName("EventID")[0].innerHTML == id) {
        event = data.getElementsByTagName("Event")[i];
        console.log("found");
        console.log(event);
      }
    }
    this.forceUpdate();
  },

  getEvent: function() {
    var RSS = "https://www.essex.ac.uk/news/eventPocketEssexFeed.xml";
    $.get(RSS, this.onRSSGet);
  },

  onClick: function() {
    if (favourite) {
      favourite = false;
    } else {
      favourite = true;
    }
    //this.forceUpdate();
    console.log("print but why");
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

      if (favourite) {
        star = <div className="ui primary"><i onClick={this.onClick()} className="star icon" style={{background:"#FFD700"}}></i></div>;
      } else {
        star = <div className="ui primary"><i onClick={this.onClick()} className="empty star icon"></i></div>;
      }

      // console.log("hey");
      // console.log(document.getElementById('title').offsetHeight);
      // if (document.getElementById('title').offsetHeight > 10) {
      //   //
      // }

      return (
        <Page>
          <Container>
            <Segment style={{margin:"14px"}}>
              <AttachedLabel id="title" top><h3>{title}</h3></AttachedLabel>
              <br/>
              <Segment>
                {star}
                <p>Author: {author}</p>
                <p>Start Date: {startDateTime}</p>
                <p>Venue: {venue}</p>
                <p>Campus: {campus}</p>
                <p>Event Type: {type}</p>
                <p>Summary: {summary}</p>
                <p>{content}</p>
                <Button fluid circular href={url} style={{marginTop:"30px"}}>Visit Event Website</Button>
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
          </BasicSegment>
        </Container>
      );
    }
  }
});

module.exports = EventDetails;
