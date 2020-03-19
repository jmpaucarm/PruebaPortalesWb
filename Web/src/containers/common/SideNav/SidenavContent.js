import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { CustomScrollbars } from "odc-common";
import { convertProfileTransactions, compareMenuOrder } from "odc-common";

class SidenavContent extends Component {
  componentDidMount() {
    const { history } = this.props;
    const that = this;
    const pathname = `${history.location.pathname}`; // get current path

    const menuLi = document.getElementsByClassName("menu");
    for (let i = 0; i < menuLi.length; i++) {
      menuLi[i].onclick = function(event) {
        for (let j = 0; j < menuLi.length; j++) {
          const parentLi = that.closest(this, "li");
          if (
            menuLi[j] !== this &&
            (parentLi === null || !parentLi.classList.contains("open"))
          ) {
            menuLi[j].classList.remove("open");
          }
        }
        this.classList.toggle("open");
      };
    }

    const activeLi = document.querySelector('a[href="' + pathname + '"]'); // select current a element
    try {
      const activeNav = this.closest(activeLi, "ul"); // select closest ul
      if (activeNav.classList.contains("sub-menu")) {
        this.closest(activeNav, "li").classList.add("open");
      } else {
        this.closest(activeLi, "li").classList.add("open");
      }
    } catch (error) {}
  }

  componentWillReceiveProps(nextProps) {
    const { history } = nextProps;
    const pathname = `${history.location.pathname}`; // get current path

    const activeLi = document.querySelector('a[href="' + pathname + '"]'); // select current a element
    try {
      const activeNav = this.closest(activeLi, "ul"); // select closest ul
      if (activeNav.classList.contains("sub-menu")) {
        this.closest(activeNav, "li").classList.add("open");
      } else {
        this.closest(activeLi, "li").classList.add("open");
      }
    } catch (error) {}
  }

  closest(el, selector) {
    try {
      let matchesFn;
      // find vendor prefix
      [
        "matches",
        "webkitMatchesSelector",
        "mozMatchesSelector",
        "msMatchesSelector",
        "oMatchesSelector"
      ].some(function(fn) {
        if (typeof document.body[fn] == "function") {
          matchesFn = fn;
          return true;
        }
        return false;
      });

      let parent;

      // traverse parents
      while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
          return parent;
        }
        el = parent;
      }
    } catch (e) {}

    return null;
  }

  render() {
    const { menuItems } = this.props;
    if (menuItems) {
      return (
        <CustomScrollbars className=" scrollbar">
          <ul
            className="nav-menu"
            ref={c => {
              this.nav = c;
            }}
          >
            {menuItems.sort(compareMenuOrder).map((lvl1, index1) => {
              return (
                <Fragment key={index1}>
                  {lvl1.children.length > 0 && (
                    <li key={index1} className="nav-header">
                      {" "}
                      {lvl1.description}{" "}
                    </li>
                  )}
                  {lvl1.children.sort(compareMenuOrder).map((lvl2, index2) => {
                    if (lvl2.level === "SCREEN")
                      return (
                        <li key={index2} className="menu no-arrow">
                          <Link to={lvl2.routeLink}>
                            <i
                              className={
                                "zmdi zmdi-" + lvl2.icon + " zmdi-hc-fw"
                              }
                            />
                            <span className="nav-text">{lvl2.description}</span>
                          </Link>
                        </li>
                      );

                    return (
                      <li key={index2} className="menu">
                        {lvl2.children.length > 0 && (
                          <Button href={""}>
                            <i
                              className={
                                "zmdi zmdi-" + lvl2.icon + " zmdi-hc-fw"
                              }
                            />
                            <span className="nav-text">{lvl2.description}</span>
                          </Button>
                        )}
                        {lvl2.children
                          .sort(compareMenuOrder)
                          .map((lvl3, index3) => {
                            return (
                              <ul key={lvl3.idMenu} className="sub-menu">
                                <li key={lvl3.idMenu}>
                                  <Link
                                    className="prepend-icon"
                                    to={lvl3.routeLink}
                                  >
                                    <span className="nav-text">
                                      {lvl3.description}
                                    </span>
                                  </Link>
                                </li>
                              </ul>
                            );
                          })}
                      </li>
                    );
                  })}
                </Fragment>
              );
            })}
          </ul>
        </CustomScrollbars>
      );
    } else {
      return <div></div>;
    }
  }
}

const mapStateToProps = ({ auth }) => {
  if (auth.authUser) {
    const { transactions } = auth.authUser;
    const index = 0;
    let menuItems = convertProfileTransactions(
      transactions[index].transactions
    );
    return { menuItems };
  }
};

export default withRouter(
  connect(
    mapStateToProps,
    undefined
  )(SidenavContent)
);
