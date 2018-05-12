import React from "react";
import PropTypes from "prop-types";
import VersionSelector from "./VersionSelector";
import { withStyles } from "material-ui/styles";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Icon from "material-ui/Icon";
import IconButton from "material-ui/IconButton";

import "./SelectedEntities.css";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    // minWidth: 300
  }
});

// @todo - remove duplication

class SelectedEntities extends React.Component {
  render() {
    if (this.props.selection.length === 0) {
      return (
        <p className="center">No selection yet. Try adjusting the filters.</p>
      );
    }

    let columns = [];
    for (var i = 0; i < this.props.columns.length; i++) {
      columns.push(
        <TableCell padding="dense" key={"selected-col-" + i}>
          {this.props.columns[i].title}
        </TableCell>
      );
    }
    columns.push(<TableCell key="slected-col-start">Report(s)</TableCell>);
    columns.push(<TableCell padding="dense" key="selected-remove" />);
    let rows = [];
    for (var j = 0; j < this.props.selection.length; j++) {
      let e = this.props.selection[j];
      let row = [];
      for (var k = 0; k < this.props.columns.length; k++) {
        row.push(
          <TableCell padding="dense" key={"selected-row-" + e.id + "-col-" + k}>
            {e[this.props.columns[k].key]}
          </TableCell>
        );
      }
      row.push(
        <TableCell padding="dense" key={"selected-row-" + e.id + "-col-" + k}>
          <VersionSelector
            key={"selected-row-" + e.id + "-report"}
            availableVersions={e.availableVersions}
            selectedVersions={e.selectedVersions}
            toggleVersion={versionID =>
              this.props.toggleVersion(e.id, versionID)
            }
          />
        </TableCell>
      );
      row.push(
        <TableCell padding="dense" key={"remove-button-cell-" + e.id}>
          <IconButton
            key={"remove-button-" + e.id}
            data-entityid={e.id}
            onClick={event => this.props.remove(e.id)}
          >
            <Icon key={"remove-button-icon-" + e.id}>clear</Icon>
          </IconButton>
        </TableCell>
      );
      rows.push(<TableRow key={"selected-row-" + e.id}>{row}</TableRow>);
    }
    return (
      <Table>
        <TableHead>
          <TableRow>{columns}</TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    );
  }
}

SelectedEntities.propTypes = {
  /**
   * Selected Entities
   */
  selection: PropTypes.array.isRequired,
  /**
   * Selected Groups
   */
  // groups: PropTypes.array.isRequired,
  /**
   * Columns for the results (entities)
   */
  columns: PropTypes.array.isRequired,
  /**
   * The callback when an entity is removed
   */
  remove: PropTypes.func.isRequired,
  /**
   * Toggles a version of a selected entity
   */
  toggleVersion: PropTypes.func.isRequired
  /**
   * The callback for when a group is removed
   */
  // handleRemoveGroup: PropTypes.array.isRequired
};

export default withStyles(styles)(SelectedEntities);