import { AuthService } from './../services/auth.service';
import { NotificationComponent } from './notification.component';

export class SignupComponent {
    constructor() {
        this._authService = new AuthService()
        this._notificationComponent = new NotificationComponent();
    }
    
    render() {
        return `
        <div class="auth-wrap d-flex mt-5">
            <div class="auth-form col col-6 mx-auto my-auto">
                <h3>Signup to Social.</h3>
                <p class="text-secondary">Please fill in the fields to signup to your Social account.</p>
                <form name="signupForm" novalidate>
                    <div class="form-group">
                    <input class="form-control form-control-sm mt-3" id="first_name" placeholder="First name">
                    <input class="form-control form-control-sm mt-3" id="last_name" placeholder="Last name">
                    <input class="form-control form-control-sm mt-3" id="nickname" placeholder="nickname">
                    <select id="gender_orientation" class="form-control form-control-sm mt-3">
                        <option value="" disabled selected>Gender</option>
                        <option value="male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input type="email" class="form-control form-control-sm mt-3" id="email" placeholder="name@example.com" required data-pattern="^\S+@[a-z]+\.[a-z]+$">                    
                    <input type="phone" class="form-control form-control-sm mt-3" id="phone" placeholder="Phone" required data-pattern="">
                    <input class="form-control form-control-sm mt-3" id="city" placeholder="City">
                    <input class="form-control form-control-sm mt-3" id="country" placeholder="Country">
                    <input class="form-control form-control-sm mt-3" id="date_of_birth_day" placeholder="date of birth day">
                    <input class="form-control form-control-sm mt-3" id="date_of_birth_month" placeholder="date of birth month">
                    <input class="form-control form-control-sm mt-3" id="date_of_birth_year" placeholder="date of birth year">                        
                    <input type="password" class="form-control form-control-sm mt-3" id="password" placeholder="password" required data-pattern="\S+">
                    <input type="password" class="form-control form-control-sm mt-3" id="сonfirm_password" placeholder="сonfirm password" required data-pattern="\S+">                    
                    <div class="d-flex mt-5">
                        <button type="submit" class="btn btn-primary btn-sm">Signup</button>
                    </div>
                    </div>
                </form>
                <div class="notification-container"></div>
            </div>
            <div class="auth-bg col col-6"></div>
        </div>
        `;
    }

    afterRender() {
        document.forms['signupForm'].addEventListener('submit', (e) => {
            e.preventDefault()
            this._notificationComponent.setContainer(document.querySelector('div.notification-container'));
            const signupElements = Array.from(e.target.elements);
            let fillFields = false;

            signupElements.forEach((element) => {
                if (element.id && !element.value) { fillFields = true; return; }
            });
            
            if (fillFields) return this._notificationComponent.setNotification({headline: 'Not all fields are filled!', text: 'Please fill in the fields.'}, 'danger');
            if ( e.target.elements['password'].value.length < 8 ) return this._notificationComponent.setNotification({headline: 'Password must be min 8 char length!', text: 'Please fill in the fields correctly.'}, 'danger');
            if ( e.target.elements['password'].value != e.target.elements['сonfirm_password'].value ) return this._notificationComponent.setNotification({headline: 'Passwords do not match!', text: 'Please fill in the fields correctly.'}, 'danger');

            const signupSettings = {
                email: e.target.elements['email'].value,
                password: e.target.elements['password'].value,
                nickname: e.target.elements['nickname'].value,
                first_name: e.target.elements['first_name'].value,
                last_name: e.target.elements['last_name'].value,
                phone: e.target.elements['phone'].value,
                gender_orientation: e.target.elements['gender_orientation'].value,
                city: e.target.elements['city'].value,
                country: e.target.elements['country'].value,
                date_of_birth_day: e.target.elements['date_of_birth_day'].value,
                date_of_birth_month: e.target.elements['date_of_birth_month'].value,
                date_of_birth_year: e.target.elements['date_of_birth_year'].value
            }

            signupElements.forEach((element) => {
                element.value = '';
            });

            this._authService.signup(signupSettings)
            .then((res) => {
                this._notificationComponent.setNotification({headline: 'Signup ok ->', text: JSON.stringify(res)}, 'success', 16000);
            })
            .catch((err) => {
                this._notificationComponent.setNotification({headline: 'Signup error ->', text: JSON.stringify(err)}, 'danger', 16000);
            })
        })
    }
}