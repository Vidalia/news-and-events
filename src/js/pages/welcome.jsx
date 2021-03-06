var React = require("-aek/react");
var Container = require("-components/container");
var {VBox} = require("-components/layout");
var {BasicSegment, Segment} = require("-components/segment");
var {Listview, Item} = require("-components/listview");
var {AttachedLabel} = require("-components/label");
var {Grid,Row,Col} = require("-components/grid");
var CampusLocator = require("uoe-campus-awareness/campus-locator");
var $ = require("jquery");
var events, campus, location;

//TODO: I need to implement campus aware for the welcome week for southend.

var WelcomePage = React.createClass({

  //Setting the initial state of essential variables and running crucial functions needed for functionality.
  getInitialState: function() {
    events = [];
    campus = new CampusLocator;

    campus.getCampus()
    .then(function(result) {
      location = result.name; // Success
    }, function(error) {
      console.error(error); // failed
      location = "Colchester";
    });

    this.getEvents();

    return {};
  },

  //Parse the event feed into the onRSSGet function in order to gather the event data.
  getEvents: function() {
    var RSS = "https://www.essex.ac.uk/news/eventPocketEssexFeed.xml";
    $.get(RSS, this.onRSSGet);
  },

  onRSSGet: function (data) {
    var currentEvent;
    for (var i = 0; i < data.getElementsByTagName("Event").length; i++) {
      currentEvent = data.getElementsByTagName("Event")[i];
      if (currentEvent.getElementsByTagName("EventType")[0].innerHTML === "welcomeweek" && currentEvent.getElementsByTagName("EventCampus")[0].innerHTML === location) {
        events.push(data.getElementsByTagName("Event")[i]);
      }
    }
    this.forceUpdate();
  },

  render:function() {

    var loading = !events;

    if (loading) {
      return (
        <Container>
          <VBox>
            <BasicSegment>
              <Segment>
                <AttachedLabel top>Upcoming Events</AttachedLabel>
                <Listview formatted items={events} itemFactory={(event)=>{
                  var id = event.link.substring(event.link.length - 5, event.link.length);
                  return (
                    <Item onClick={this.chosenEvent.bind(this,id)}>
                        <Grid>
                          <Row>
                            <Col className="one wide column">
                              <i className="certificate icon"/>
                            </Col>
                            <Col className="ten wide column">
                              {event.title}
                            </Col>
                            <Col className="five wide column">
                              {event.date.substring(0,16)}
                            </Col>
                          </Row>
                        </Grid>
                    </Item>
                  );
                }}/>
              </Segment>
            </BasicSegment>
          </VBox>
        </Container>
      );
    } else {
      return (
        <Container>
          <VBox>
            <BasicSegment>
              <Segment>
                <AttachedLabel top>Upcoming Events</AttachedLabel>
                <Segment>
                  <h4 id="warning">There are currently no upcoming events, please check back at a later date.</h4>
                </Segment>
              </Segment>
            </BasicSegment>
          </VBox>
        </Container>
      );
    }
  }
});

module.exports = WelcomePage;
