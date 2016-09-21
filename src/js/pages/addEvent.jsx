var React = require("-aek/react");
var Container = require("-components/container");
var {VBox} = require("-components/layout");
var {BasicSegment} = require("-components/segment");
//var {Listview, Item} = require("-components/listview");
//var Page = require("-components/page");
//var {Grid,Row,Col} = require("-components/grid");
//var $ = require("jquery");

//This page allows for users to add their own events to the universities event feed. Refer to eventDetails in order to make this functional.

var AddPage = React.createClass({

  render:function() {
    //var loading = !newsData;

    return (
      <Container>
        <VBox>
          <BasicSegment>
            <form className="ui form">
              <h3 className="ui dividing header">Submit an event</h3>
                <div className="inline fields">
                  <label>Your name:</label>
                  <div className="field">
                    <input type="text" name="name" placeholder="John Smith"/>
                  </div>
                </div>
                <div className="inline fields">
                  <label>Your email address:</label>
                  <div className="field">
                    <input type="text" name="email" placeholder="John Smith"/>
                  </div>
                </div>
                <div className="inline fields">
                  <label>Your contect number:</label>
                  <div className="field">
                    <input type="text" name="number" placeholder="John Smith"/>
                  </div>
                </div>
                <div className="inline fields">
                  <label>Event title:</label>
                  <div className="field">
                    <input type="text" name="event" placeholder="John Smith"/>
                  </div>
                </div>
                <div className="inline fields">
                  <label>Speaker:</label>
                  <div className="field">
                    <input type="text" name="speaker" placeholder="John Smith"/>
                  </div>
                </div>
                <div className="inline fields">
                  <label>Event start date:</label>
                  <div className="field">
                    <input type="text" name="startDate" placeholder="John Smith"/>
                  </div>
                </div>
                <div className="inline fields">
                  <label>Event end date:</label>
                  <div className="field">
                    <input type="text" name="endDate" placeholder="John Smith"/>
                  </div>
                </div>
                <div className="inline fields">
                  <label>Start time:</label>
                  <div className="field">
                    <input type="text" name="startTime" placeholder="John Smith"/>
                  </div>
                </div>
                <div className="inline fields">
                  <label>End time:</label>
                  <div className="field">
                    <input type="text" name="endTime" placeholder="John Smith"/>
                  </div>
                </div>
                <div className="inline fields">
                  <label>Is this a recurring event?:</label>
                  <div className="field">
                    <input type="text" name="recurring" placeholder="John Smith"/>
                  </div>
                </div>
                <div className="inline fields">
                  <label>Venue:</label>
                  <div className="field">
                    <input type="text" name="venue" placeholder="John Smith"/>
                  </div>
                </div>
            </form>
          </BasicSegment>
        </VBox>
      </Container>
    );
  }
});

module.exports = AddPage;
