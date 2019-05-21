import * as React from 'react'
import * as ReactDOM from 'react-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Grid } from '@material-ui/core'
import * as Crypto from 'crypto'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

const App = ({
  makeHash = (password: string) => {
    const sha256 = Crypto.createHash('sha256')
    sha256.update(password)
    return sha256.digest('hex')
  },
  makeString = (arr: (string | null)[][]) => {
    return arr
      .reduce((acm, val) => acm.concat(val), [])
      .reduce((acm, val) => acm + val)
  },
  row = 1,
  col = 1
}) => {
  const [state, setState] = React.useState([...Array(row)].map(() =>
    [...Array(col)].map(() => '')
  ) as string[][])
  const [isOpen, setOpen] = React.useState(false)
  return (
    <>
      <Dialog open={isOpen} onClose={() => setOpen(false)}>
        <DialogContent>
          <DialogContentText>
            {`Your password hash is ${makeHash(makeString(state))}.`}
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Grid container justify="center" item xs={12}>
        {[...Array(row)].map((value, index) => (
          <Grid key={`row-${index}`} item xs={12} container justify="center">
            {[...Array(col)].map((v, i) => (
              <TextField
                key={`col-${i}`}
                variant="outlined"
                inputProps={{ style: { textAlign: 'center' }, maxLength: 1 }}
                onChange={e => {
                  const input = e.target.value
                  setState(s =>
                    s.map((arr, rowIndex) =>
                      arr.map((str, colIndex) =>
                        rowIndex === index && colIndex === i ? input : str
                      )
                    )
                  )
                }}
                style={{ width: 60, height: 60, margin: 5 }}
              />
            ))}
          </Grid>
        ))}
        <Grid>
          <Button variant="contained" onClick={() => setOpen(() => true)}>
            Confirm
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

ReactDOM.render(<App row={5} col={7} />, document.getElementById('root'))
