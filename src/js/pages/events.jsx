var React = require("-aek/react");
var Container = require("-components/container");
var {VBox} = require("-components/layout");
var {BasicSegment} = require("-components/segment");

var EventsPage = React.createClass({

  render:function() {

    return (
      <Container>
        <VBox>
          <BasicSegment>
          </BasicSegment>
        </VBox>
      </Container>
    );

  }

});

module.exports = EventsPage;
