import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ReactWordCloud from "react-wordcloud";
import { Grid } from "@material-ui/core";
import countBy from "lodash/countBy"

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "ceci est un exemple de nuage de mot et mot ressort bien car trois fois mot dans le texte",
      words: [],
      wordCloud: [
      ]
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.getWordListFromText(this.state.text)
  }

  getWordListFromText(text) {
    let words = text.match(/\b(\w+)\b/g).map(word => word.toUpperCase());
    this.setState({ words: words });
    let wordCount = countBy(words);
    let wordCloud = []
    Object.entries(wordCount).forEach(entry => {
      wordCloud.push({word: entry[0], value: entry[1]})
    });
    this.setState({ wordCloud: wordCloud });
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
    this.getWordListFromText(event.target.value);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container justify="center" direction="row">
        <Grid item xs={12}>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="outlined-full-width"
              label="Mots à afficher dans le nuage de mots"
              multiline
              style={{ margin: 8 }}
              helperText="Renseigner le texte, l'occurence de chaque mot sera proportionnelle à la taille d'écriture du mot dans le nuage ci-dessous :"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
              value={this.state.text}
              onChange={this.handleChange}
            />
          </form>
        </Grid>
        <Grid item xs={12}>
          <div style={{ width: 600, height: 400 }}>
            <ReactWordCloud
              words={this.state.wordCloud}
              wordCountKey={"value"}
              wordKey={"word"}
            />
          </div>
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(styles)(App);
