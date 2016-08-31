var React = require("-aek/react");
var Container = require("-components/container");
var {VBox} = require("-components/layout");
var {BannerHeader} = require("-components/header");
var {BasicSegment} = require("-components/segment");
//var AekStorage = require("@ombiel/aek-lib/storage");

//var storage = new AekStorage("News");

var NewsPage = require("./pages/news");
var EventsPage = require("./pages/events");
var WelcomePage = require("./pages/welcome");

var newStudent = true;
var buttonState;
var child;
var title;

if (newStudent) {
  buttonState = ["active item","item","item"];
  child = <WelcomePage/>;
  title = "Welcome Week";
} else {
  buttonState = ["active item","item"];
  child = <NewsPage/>;
  title = "News";
}

var Screen = React.createClass({

  menuOption: function(option, ev) {
    ev.preventDefault();
    if (newStudent) {
      console.log("new student detected");
      if (option == "welcome") {
        console.log("welcome week");
        child = <WelcomePage/>;
        title = "Welcome Week";
        buttonState[0] = buttonState[1] = buttonState[2] = "item";
        buttonState[0] = "active item";
      } else if (option == "news") {
        console.log("news");
        child = <NewsPage/>;
        title = "University of Essex News";
        buttonState[0] = buttonState[1] = buttonState[2] = "item";
        buttonState[1] = "active item";
      } else if (option == "events") {
        console.log("events");
        child = <EventsPage/>;
        title = "Events";
        buttonState[0] = buttonState[1] = buttonState[2] = "item";
        buttonState[2] = "active item";
      }
    } else {
      if (option == "news") {
        child = <NewsPage/>;
        title = "University of Essex News";
        buttonState[0] = buttonState[1] = "item";
        buttonState[0] = "active item";
      } else if (option == "events") {
        child = <EventsPage/>;
        title = "Events";
        buttonState[0] = buttonState[1] = "item";
        buttonState[1] = "active item";
      }
    }
    this.forceUpdate();
  },

  render:function() {
    var buttonMenu;
    console.log(buttonState);

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

    return (
      <Container>
        <VBox>
          <BannerHeader theme="alt" key="header" flex={0}>{title}</BannerHeader>
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
