import Header from "../component/Header";
import Signup from "../component/Signup";

export default function SignupPage() {
    return (
        <>
            <Header
                heading="Signup to create an account"
                paragraph="Already have an account? "
                linkName="Login"
                linkUrl="/"
            />
            <Signup />
        </>
    )
}