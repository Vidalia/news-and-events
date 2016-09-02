var React = require("-aek/react");
var Container = require("-components/container");
var {BasicSegment} = require("-components/segment");
var {AttachedLabel} = require("-components/label");
var Page = require("-components/page");
var $ = require("jquery");
var event, id;

var EventDetails = React.createClass({

  getInitialState: function() {
    this.onRSSGet = this.onRSSGet.bind(this);
    id = this.props.value;
    console.log(id);
    console.log("fak");
    return {};
  },

  componentDidMount: function() {
    this.getEvent();
  },

  onRSSGet: function (data) {
    console.log("right ere m8");
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
      var venue = event.getElementsByTagName("EventVenue")[0].innerHTML;
      var campus = event.getElementsByTagName("EventCampus")[0].innerHTML;
      var type = event.getElementsByTagName("EventType")[0].innerHTML;
      var summary = event.getElementsByTagName("EventSummary")[0].innerHTML;
      var content = event.getElementsByTagName("EventContentClean")[0].innerHTML;
      var url = event.getElementsByTagName("EventURL")[0].innerHTML;

      return (
        <Page>
          <Container>
            <BasicSegment>
              <AttachedLabel top left>{title}</AttachedLabel>
              <p>{author}</p>
              <p>{startDateTime}</p>
              <p>{venue}</p>
              <p>{campus}</p>
              <p>{type}</p>
              <p>{summary}</p>
              <p>{content}</p>
              <p>{url}</p>
            </BasicSegment>
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
