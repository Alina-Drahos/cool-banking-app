import { LogIn } from '../components/LogIn'

export interface LogInPageProps {
  userLoggedIn: () => void
}

export function LogInPage(props: LogInPageProps) {
  const logInClicked = () => {
    // perform validation
    props.userLoggedIn()
  }

  return (
    <>
      <LogIn buttonClicked={logInClicked} />
    </>
  )
}
