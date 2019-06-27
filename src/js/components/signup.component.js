import { AuthService } from './../services';
import { NotificationComponent } from './notification.component'
import { Routing } from './../core';
import { LoaderComponent } from './loader.component';

export class SignupComponent {
    constructor() {
        this._authService = new AuthService();
        this._notificationComponent = new NotificationComponent();
        this._routing = new Routing();
        this._loaderComponent = new LoaderComponent();

        this.afterRender = this.afterRender.bind(this)
    }

    render() {
        return `
        <div class="auth-wrap d-flex mt-5">
            <div class="auth-form col col-6 mx-auto my-auto">
                <h3>Signup to Social.</h3>
                <p class="text-secondary">Enter your information, e-mail address & password to signup to Social wetwork.</p>
                <form name="signupForm" novalidate>
                    <div class="form-group">
                        <input type="first_name" class="form-control form-control-sm mt-3" id="first_name" placeholder="Your first name" required >
                        <input type="last_name" class="form-control form-control-sm mt-3" id="last_name" placeholder="Your last name" required >
                        <input type="nickname" class="form-control form-control-sm mt-3" id="nickname" placeholder="Your nickname" required >
                        <input type="email" class="form-control form-control-sm mt-3" id="email" placeholder="name@example.com" required data-pattern="^\S+@[a-z]+\.[a-z]+$">
                        <select id="gender_orientation" class="form-control form-control-sm mt-3">
                            <option value="" disabled selected>Gender</option>
                            <option value="male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <input type="phone" class="form-control form-control-sm mt-3" id="phone" placeholder="Your phone" required >
                        <input type="city" class="form-control form-control-sm mt-3" id="city" placeholder="Your city" required >
                        <input type="country" class="form-control form-control-sm mt-3" id="country" placeholder="Your country" required >
                        <input type="date_of_birth_day" class="form-control form-control-sm mt-3" id="date_of_birth_day" placeholder="Your date of birth day" required >
                        <input type="date_of_birth_month" class="form-control form-control-sm mt-3" id="date_of_birth_month" placeholder="Your date of birth month" required >
                        <input type="date_of_birth_year" class="form-control form-control-sm mt-3" id="date_of_birth_year" placeholder="Your date of birth year" required >
                        <input type="password" class="form-control form-control-sm mt-3" id="password" placeholder="password" required data-pattern="\S+">
                        <input type="password" class="form-control form-control-sm mt-3" id="сonfirm_password" placeholder="сonfirm password" required data-pattern="\S+">                    
                        <div class="d-flex mt-5">
                            <button type="submit" class="btn btn-primary btn-sm" id="submit_button">Signup</button>
                            <div id="loader-container" class="ml-auto"></div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="auth-bg col col-6">
                <div id="notification-container"></div>
            </div>
        </div>
        `;
    }

    afterRender() {
        document.forms['signupForm'].addEventListener('submit', async (e) => {
            e.preventDefault();
            this._notificationComponent.setContainer(document.querySelector('div#notification-container'));
            this._loaderComponent.setContainer(document.querySelector('div#loader-container'));

            const values = Array.prototype.reduce.call(document.querySelectorAll('input'), (init, input) => ({
                ...init,
                [input.id]: input.value
            }), {})
            values.gender_orientation = e.target.elements['gender_orientation'].value;

            if ( Object.keys(values).some(v => !values[v]) && e.target.elements['gender_orientation'].value )
                return this._notificationComponent.setNotification({headline: 'Not all fields are filled!', text: 'Please fill in the fields.'}, 'danger');
            if ( e.target.elements['password'].value.length < 8 )
                return this._notificationComponent.setNotification({headline: 'Password must be min 8 char length!', text: 'Please fill in the fields correctly.'}, 'danger');
            if ( e.target.elements['password'].value != e.target.elements['сonfirm_password'].value )
                return this._notificationComponent.setNotification({headline: 'Passwords do not match!', text: 'Please fill in the fields correctly.'}, 'danger');

            e.target.elements['submit_button'].disabled = true;                    // Disable button
            this._loaderComponent.setLoader()                           // Set loader

            try {
                const response = await this._authService.signup({ ...values });
                this._loaderComponent.removeLoader()
                e.target.elements['submit_button'].disabled = false
                this._routing.navigate('/login');
            }
            catch(error) {
                this._loaderComponent.removeLoader()
                e.target.elements['submit_button'].disabled = false
                this._notificationComponent.setNotification({headline: 'Signup error!', text: error.message}, 'danger', 16000);
            }
        });
    }
}