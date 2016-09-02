var React = require("-aek/react");
var Container = require("-components/container");
var {VBox} = require("-components/layout");
var {BannerHeader} = require("-components/header");
var {BasicSegment} = require("-components/segment");

var NewsPage = require("./pages/news");
var EventsPage = require("./pages/events");
var WelcomePage = require("./pages/welcome");
var AddPage = require("./pages/addEvent");

var newStudent, buttonState, child, title, eventPage, banner, addEvent;

var Screen = React.createClass({

  getInitialState: function() {
    newStudent = true;
    eventPage = false;
    addEvent = false;
    if (newStudent) {
      buttonState = ["active item","item","item"];
      child = <WelcomePage/>;
      title = "Welcome Week";
    } else {
      buttonState = ["active item","item"];
      child = <NewsPage/>;
      title = "News";
    }
    return {};
  },

  menuOption: function(option, ev) {
    ev.preventDefault();
    if (newStudent) {
      if (option == "welcome") {
        child = <WelcomePage/>;
        title = "Welcome Week";
        eventPage = false;
        addEvent = false;
        buttonState[0] = buttonState[1] = buttonState[2] = "item";
        buttonState[0] = "active item";
      } else if (option == "news") {
        child = <NewsPage/>;
        title = "University of Essex News";
        eventPage = false;
        addEvent = false;
        buttonState[0] = buttonState[1] = buttonState[2] = "item";
        buttonState[1] = "active item";
      } else if (option == "events") {
        child = <EventsPage/>;
        eventPage = true;
        addEvent = false;
        title = "University of Essex Events";
        buttonState[0] = buttonState[1] = buttonState[2] = "item";
        buttonState[2] = "active item";
      } else if (option == "add") {
        child = <AddPage/>;
        title = "Add Event";
        eventPage = false;
        addEvent = true;
      }
    } else {
      if (option == "news") {
        child = <NewsPage/>;
        title = "University of Essex News";
        eventPage = false;
        addEvent = false;
        buttonState[0] = buttonState[1] = "item";
        buttonState[0] = "active item";
      } else if (option == "events") {
        child = <EventsPage/>;
        eventPage = true;
        addEvent = false;
        title = "University of Essex Events";
        buttonState[0] = buttonState[1] = "item";
        buttonState[1] = "active item";
      } else if (option == "add") {
        child = <AddPage/>;
        title = "Add Event";
        eventPage = false;
        addEvent = true;
      }
    }
    this.forceUpdate();
  },

  render:function() {
    var buttonMenu;

    if (newStudent) {
      buttonMenu = <div style={{position:"absolute", bottom:"0px", width:"100%", margin:"0", display:"block"}}>
          <div style={{width:"100%", margin:"0"}}  className="ui primary menu">
            <a style={{width:"33.3%"}} className={buttonState[0]} onClick={this.menuOption.bind(this,"welcome")}>
              <i className="certificate icon"></i> Welcome Week
            </a>
            <a style={{width:"33.3%"}} className={buttonState[1]} onClick={this.menuOption.bind(this,"news")}>
              <i className="newspaper icon"></i> News
            </a>
            <a style={{width:"33.3%"}} className={buttonState[2]} onClick={this.menuOption.bind(this,"events")}>
              <i className="announcement icon"></i> Events
            </a>
          </div>
        </div>;
    } else {
      buttonMenu = <div style={{position:"absolute", bottom:"0px", width:"100%", margin:"0", display:"block"}}>
          <div style={{width:"100%", margin:"0"}}  className="ui primary menu">
            <a style={{width:"50%"}} className={buttonState[0]} onClick={this.menuOption.bind(this,"news")}>
              <i className="newspaper icon"></i> News
            </a>
            <a style={{width:"50%"}} className={buttonState[1]} onClick={this.menuOption.bind(this,"events")}>
              <i className="announcement icon"></i> Events
            </a>
          </div>
        </div>;
    }

    if (eventPage) {
      banner = <BannerHeader theme="alt" key="header" flex={0}>
        {title}
        <i className="plus square outline icon" onClick={this.menuOption.bind(this,"add")}></i>
      </BannerHeader>;
    } else if (addEvent) {
      banner = <BannerHeader theme="alt" key="header" flex={0}>
        {title}
        <i className="remove circle icon" onClick={this.menuOption.bind(this,"events")}></i>
      </BannerHeader>;
    } else {
      banner = <BannerHeader theme="alt" key="header" flex={0}>{title}</BannerHeader>;
    }

    return (
      <Container>
        <VBox>
          {banner}
          <BasicSegment style={{height:"100%"}}>
            {child}
          </BasicSegment>
        </VBox>
        {buttonMenu}
      </Container>
    );
  }
});

React.render(<Screen/>,document.body);
