<template>
    <div class="-mt-32">
        <div class="signContainer relative max-w-full h-screen grid-cols[1fr] overflow-hidden bg-white before before:content-[''] before:absolute before:-translate-y-2/4 before:w-[2000px] before:h-[2000px] before:bg-green-800 before:right-2/4 before:duration-[800ms] before:ease-in-out before:z-[6]">
            <section class="forms-cont absolute w-full h-full top-0 left-0">
                <div class="signin-signup absolute z-[5] top-[95%] md:top-2/4 left-1/2 md:left-3/4 w-full md:w-6/12 duration-[1000ms] ease-in-out -translate-x-1/2 -translate-y-full md:-translate-y-1/2 grid">
                    <form action="" class="signin-form col-[1_/_span_2] row-[1_/_span_2] z-[2] duration-[100ms] delay-[500ms] overflow-hidden px-10">
                        <h1 class="text-center text-4xl mb-8 font-bold">Sign In</h1>
                        <label class="input sign-inputs mb-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                class="h-4 w-4 opacity-70">
                                <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input type="email" class="grow " placeholder="Email Address" />
                        </label>
                        <label class="input sign-inputs">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                class="h-4 w-4 opacity-70">
                                <path
                                fill-rule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clip-rule="evenodd" />
                            </svg>
                            <input type="password" class="grow" value="password" />
                        </label>
                        <button class="btn border-0 text-stone-600 text-xs shadow-none min-h-0 h-0">Froget Your Password</button>
                        <button class="signin-btn btn btn-active bg-[#166534] hover:bg-[#0A1E1E] block mx-auto border-0 text-white px-10 mt-5">Sign In</button>
                    </form>
                    <form action="" class="signup-form col-[1_/_span_2] row-[1_/_span_2] z-[1] duration-[100ms] delay-[500ms] grid grid-cols-2 ps-10 pe-16 overflow-hidden opacity-0">
                        <h1 class="text-center text-4xl mb-8 font-bold col-span-2">Sign Up</h1>
                        <label class="input sign-inputs mb-3 me-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                class="h-4 w-4 opacity-70">
                                <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input type="text" class="grow" placeholder="Full Name" />
                        </label>
                        <label class="input sign-inputs mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24" fill="currentColor"
                            class="h-4 w-4 opacity-70">
                            <path
                            fill-rule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clip-rule="evenodd" />
                            </svg>
                            <input type="text" class="grow" placeholder="Phone Number" />
                        </label>
                        <label class="input sign-inputs mb-3 me-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                class="h-4 w-4 opacity-70">
                                <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input type="email" class="grow" placeholder="Email Address" />
                        </label>
                        <label class="input sign-inputs mb-3">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="h-4 w-4 opacity-70">
                                <path
                                fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" />
                            </svg>
                            <input type="text" class="grow" placeholder="Date of Birth" />
                        </label>
                        <label class="input sign-inputs mb-3 me-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                class="h-4 w-4 opacity-70">
                                <path
                                fill-rule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clip-rule="evenodd" />
                            </svg>
                            <input type="password" class="grow" placeholder="Password" />
                        </label>
                        <label class="input sign-inputs mb-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                class="h-4 w-4 opacity-70">
                                <path
                                fill-rule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clip-rule="evenodd" />
                            </svg>
                            <input type="password" class="grow" placeholder="Re-Password" />
                        </label>
                        <button class="signup-btn btn btn-active bg-[#166534] hover:bg-[#0A1E1E] block mx-auto border-0 text-white px-10 mt-5 col-span-2">Sign Up</button>
                    </form>
                </div>
            </section>
            <section class="panels-cont absolute w-full h-full top-0 left-0 grid ">
                <div class="panel left-panel pointer-events-auto duration-[1000ms] ease-in-out z-[6] flex sm:flex-row md:flex-col md:justify-center items-center text-white md:mt-0">
                    <div class="text transition-transform duration-[900ms] delay-[300ms] ease-in-out">
                        <h3 class="text-center text-3xl mb-3">Hello, Friend!</h3>
                        <p class="text-sm">Enter your Info and Start Journey with Us</p>
                        <button id="signup-btn" class="btn btn-active block mx-auto border-2 border-solid border-white hover:bg-white hover:text-green-950 hover:border-white px-10 mt-5 col-span-2">Sign Up</button>
                    </div>
                </div>
                <div class="panel right-panel pointer-events-none opacity-0 duration-[1000ms] ease-in-out z-[6] flex sm:flex-row md:flex-col md:justify-center items-center text-white">
                    <div class="text transition-transform duration-[900ms] delay-[300ms] ease-in-out translate-x-[800px]">
                        <h3 class="text-center text-3xl mb-3">Welcome Back!</h3>
                        <p class="text-sm">To Keep Connected with us, Please login with your info</p>
                        <button id="signin-btn" class="btn block mx-auto border-2 border-solid border-white hover:bg-white hover:text-green-950 hover:border-white px-10 mt-5 col-span-2">Sign In</button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import { onMounted } from 'vue';

export default {
    name: 'SignPage',
    setup () {
        onMounted(() => {
            const signUpBtn = document.getElementById("signup-btn");
            const signInBtn = document.getElementById("signin-btn");
            const signContainer = document.querySelector(".signContainer");

            signUpBtn.addEventListener("click", function() {
                signContainer.classList.add("signup-mode");
            });
            signInBtn.addEventListener("click", function() {
                signContainer.classList.remove("signup-mode");
            });

        })
        return {}
    }
}
</script>

<style scoped>
    .panels-cont {
        grid-template-columns: repeat(2, 1fr);
    }

    /* Animation */

    .signContainer.signup-mode::before {
        transform: translate(100%, -50%);
        right: 52%;
    }
    .signContainer.signup-mode .left-panel .text {
        transform: translateX(-800px);
    }
    .signContainer.signup-mode .signin-signup {
        left: 25%;
    }
    .signContainer.signup-mode form.signup-form {
        opacity: 1;
        z-index: 2;
    }
    .signContainer.signup-mode form.signin-form {
        opacity: 0;
        z-index: 1;
    }
    .signContainer.signup-mode .right-panel .text {
        transform: translateX(0%);
    }
    .signContainer.signup-mode .right-panel {
        pointer-events: all;
        opacity: 1;
    }
    .signContainer.signup-mode .left-panel {
        pointer-events: none;
        opacity: 0;
    }

    /* Media Queries */
    
    @media (max-width: 768px){
        .signContainer.signup-mode .signin-signup {
            left: 50%;
        }
        .panels-cont {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 2fr 1fr;
        }
        .panel {
            grid-column: 1 / 2;
        }
        .right-panel {
            padding: 0 20px 20px;
            justify-content: space-around;
            grid-row: 3 / 4;
            text-align: center;
        }

        .left-panel {
            padding-top: 20px;
            justify-content: space-around;
            grid-row: 1 / 2;
        }
        .signContainer:before {
            width: 1500px;
            height: 1500px;
            transform: translateX(-50%);
            bottom: 72%;
            left: 50%;
            right: initial;
            top: initial;
            transition: 2s ease-in-out;
        }
        .signContainer.signup-mode:before {
            transform: translate(-50%, 100%);
            bottom: 28%;
            left: 50%;
        }
        .signContainer.signup-mode .left-panel .text {
            transform: translateY(-300px);
        }
        .signContainer.signup-mode .right-panel .text {
            transform: translateY(0px);
        }
        .signContainer .right-panel .text {
            transform: translateY(300px);
        }
        .signContainer.signup-mode .signin-signup {
            top: 10%;
            transform: translate(-50%, 0);
        }
    }
</style>