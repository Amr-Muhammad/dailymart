<template>
    <div class="-my-36">
        <div
            class="signContainer relative max-w-full h-screen grid-cols[1fr] overflow-hidden bg-white before before:content-[''] before:absolute before:-translate-y-2/4 before:w-[2000px] before:h-[4000px] before:bg-green-800 before:right-2/4 before:duration-[800ms] before:ease-in-out before:z-[6]">

            <section class="forms-cont absolute w-full h-full top-0 left-0">
                <div
                    class="signin-signup absolute z-[5] top-[95%] lg:top-2/4 left-1/2 lg:left-3/4 w-full md:w-6/12 duration-[1000ms] ease-in-out -translate-x-1/2 -translate-y-full md:-translate-y-1/2 grid">

                    <form @submit.prevent="signinForm()"
                        class="signin-form col-[1_/_span_2] row-[1_/_span_2] z-[2] duration-[100ms] delay-[500ms] overflow-hidden px-10">
                        <h1 class="text-center text-4xl mb-8 font-bold">Sign In</h1>
                        <div ref="notExistMsg"
                            class="hidden w-fit mx-auto flex-col items-center text-red-600 justify-center py-3 px-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-8">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                            </svg>
                            <p>Your Email or Password is incorrect</p>
                        </div>
                        <label class="input sign-inputs mb-4 relative">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                class="h-4 w-4 opacity-70 hidden md:block">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input ref="emailInput" type="email" class="grow " placeholder="Email Address"
                                v-model="email" @blur="validateEmail" />
                            <span v-if="emailError"
                                class="error-msg absolute text-[6px] md:text-[10px] -bottom-[20px] left-0 text-red-700">{{
                                    emailError }}</span>
                        </label>
                        <label class="input sign-inputs">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                class="h-4 w-4 opacity-70 hidden md:block">
                                <path fill-rule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clip-rule="evenodd" />
                            </svg>
                            <input ref="passInput" type="password" class="grow" placeholder="Password"
                                v-model="password" />
                        </label>
                        <button onclick="my_modal_1.showModal()"
                            class="btn border-0 text-stone-600 text-xs shadow-none min-h-0 h-0 hover:text-red-700">Forgot
                            Password?</button>
                        <dialog id="my_modal_1" class="modal">
                            <div class="modal-box bg-white relative">
                                <h3 class="text-lg font-bold">Reset Password</h3>
                                <div class="modal-action">
                                    <form method="dialog" class="w-full flex ">
                                        <input ref="emailInput" type="email"
                                            class="grow rounded-md focus:outline-none border-2 border-solid border-stone-400 p-2"
                                            placeholder="Email Address" v-model="emailReset" />
                                        <button @click="forgotPassword"
                                            class="btn ms-5 bg-[#166534] hover:bg-[#0A1E1E] text-white">Reset</button>
                                        <button a
                                            class="btn ms-2 text-stone-800 hover:text-red-600 border-none shadow-none absolute top-0 right-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="size-4">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                        <button
                            class="signin-btn btn btn-active bg-[#166534] hover:bg-[#0A1E1E] block mx-auto border-0 text-white px-10 mt-5">Sign
                            In</button>
                    </form>

                    <form @submit.prevent="submitForm()"
                        class="signup-form col-[1_/_span_2] row-[1_/_span_2] z-[1] duration-[100ms] delay-[500ms] grid grid-cols-2 ps-10 pe-16 overflow-hidden opacity-0">
                        <h1 class="text-center text-4xl mb-8 font-bold col-span-2">Sign Up</h1>

                        <label class="firstName input sign-inputs mb-4 me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                class="h-4 w-4 opacity-70 hidden md:block">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input type="text" class="grow" placeholder="First Name" v-model="firstName" required />
                        </label>

                        <label class="lastName input sign-inputs mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                class="h-4 w-4 opacity-70 hidden md:block">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input type="text" class="grow" placeholder="Last Name" v-model="lastName" required />
                        </label>

                        <label class="email input sign-inputs mb-4 relative me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                class="h-4 w-4 opacity-70 hidden md:block">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input type="email" class="grow" placeholder="Email Address" v-model="email"
                                @input="validateEmail" required />
                            <span v-if="emailError"
                                class="error-msg absolute text-[6px] lg:text-[10px] -bottom-[20px] left-0 text-red-700">{{
                                    emailError }}</span>
                            <span v-if="emailExist"
                                class="error-msg absolute text-[6px] lg:text-[10px] -bottom-[20px] left-0 text-red-700">{{
                                    emailExist }}</span>
                        </label>

                        <label class="phoneNumber input sign-inputs mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="h-4 w-4 opacity-70 hidden md:block">
                                <path fill-rule="evenodd"
                                    d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                                    clip-rule="evenodd" />
                            </svg>
                            <input type="text" class="grow" placeholder="Phone Number" v-model="phonenumber" required />
                        </label>

                        <label class="password input sign-inputs mb-4 me-3 relative">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                class="h-4 w-4 opacity-70 hidden md:block">
                                <path fill-rule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clip-rule="evenodd" />
                            </svg>
                            <input type="password" class="grow" placeholder="Password" v-model="password"
                                @input="validatePasswords" required />
                            <span v-if="passwordError"
                                class="error-msg absolute text-[6px] lg:text-[10px] -bottom-[20px] left-0 text-red-700">{{
                                    passwordError }}</span>
                        </label>

                        <label class="rePassword input sign-inputs relative">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                class="h-4 w-4 opacity-70 hidden md:block">
                                <path fill-rule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clip-rule="evenodd" />
                            </svg>
                            <input type="password" class="grow" placeholder="Re-Password" v-model="rePassword"
                                @input="chckPassword" required />
                            <span v-if="rePasswordError"
                                class="error-msg absolute text-[6px] lg:text-[10px] -bottom-[20px] left-0 text-red-700">{{
                                    rePasswordError }}</span>
                        </label>

                        <div id="address" class="me-3 flex">

                            <label v-if="addressFlag" class="input sign-inputs relative w-full">
                                <svg fill="#626973" width="20px" height="20px" viewBox="0 0 100 100"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M49,18.92A23.74,23.74,0,0,0,25.27,42.77c0,16.48,17,31.59,22.23,35.59a2.45,2.45,0,0,0,3.12,0c5.24-4.12,22.1-19.11,22.1-35.59A23.74,23.74,0,0,0,49,18.92Zm0,33.71a10,10,0,1,1,10-10A10,10,0,0,1,49,52.63Z">
                                        </path>
                                    </g>
                                </svg>
                                <input type="text" class="grow" placeholder="Address" v-model="address.location"
                                    required />
                                <span v-if="addressErrMessage"
                                    class="error-msg absolute text-[6px] lg:text-[10px] -bottom-[20px] left-0 text-red-700">{{
                                        addressErrMessage }}</span>
                            </label>

                            <div v-if="!addressFlag" class="flex items-center gap-2">
                                <svg class="text-green-800" fill="text-green-800" width="25px" height="25px"
                                    viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)"
                                    stroke="#166534">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                                    </g>
                                    <g id="SVGRepo_iconCarrier">
                                        <title></title>
                                        <path
                                            d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Zm25-91.5-29,35L76,94c-4.5-3.5-10.5-2.5-14,2s-2.5,10.5,2,14c6,4.5,12.5,9,18.5,13.5,4.5,3,8.5,7.5,14,8,1.5,0,3.5,0,5-1l3-3,22.5-27c4-5,8-9.5,12-14.5,3-4,4-9,.5-13L138,71.5c-3.5-2.5-9.5-2-13,2Z">
                                        </path>
                                    </g>
                                </svg>
                                <p>Your location has been saved</p>
                            </div>

                        </div>

                        <button v-if="addressFlag" @click="getUserLocation()" type="button"
                            class="px-8 py-2 bg-blue-900 text-white rounded-md hover:bg-white hover:text-black transition-all duration-200 hover:outline hover:outline-1 text-sm">Share
                            My
                            Location Instead</button>

                        <div class="my-4 flex items-center">
                            <p class="font-semibold me-8">Gender:</p>
                            <label class="label cursor-pointer me-6">
                                <span class="label-text me-2 text-xs lg:text-base">Male</span>
                                <input type="radio" name="radio-10" value="male"
                                    class="radio w-4 h-4 checked:bg-blue-600 border-stone-600 checked:border-blue-600"
                                    checked="checked" v-model="gender" />
                            </label>
                            <label class="label cursor-pointer">
                                <span class="label-text me-2 text-xs lg:text-base">Female</span>
                                <input type="radio" name="radio-10" value="female"
                                    class="radio w-4 h-4 checked:bg-blue-600 border-stone-600 checked:border-blue-600"
                                    checked="checked" v-model="gender" />
                            </label>
                        </div>

                        <button
                            class="signup-btn btn btn-active bg-[#166534] hover:bg-[#0A1E1E] block mx-auto border-0 text-white px-14 mt-5 col-span-2">Sign
                            Up</button>
                    </form>

                </div>
            </section>

            <section class="panels-cont absolute w-full h-full top-0 left-0 grid ">
                <div
                    class="panel left-panel pointer-events-auto duration-[1000ms] ease-in-out z-[6] flex sm:flex-row md:flex-col md:justify-center items-center text-white md:mt-0">
                    <div class="text transition-transform duration-[900ms] delay-[300ms] ease-in-out">
                        <h3 class="text-center text-3xl mb-3">Hello, Friend!</h3>
                        <p class="text-sm">Enter your Info and Start Journey with Us</p>
                        <button id="signup-btn"
                            class="btn btn-active block mx-auto border-2 border-solid border-white hover:bg-white hover:text-green-950 hover:border-white px-10 mt-5 col-span-2">Sign
                            Up</button>
                    </div>
                </div>
                <div
                    class="panel right-panel pointer-events-none opacity-0 duration-[1000ms] ease-in-out z-[6] flex sm:flex-row md:flex-col md:justify-center items-center text-white">
                    <div
                        class="text transition-transform duration-[900ms] delay-[300ms] ease-in-out translate-x-[800px]">
                        <h3 class="text-center text-3xl mb-3">Welcome Back!</h3>
                        <p class="text-sm">To Keep Connected with us, Please login with your info</p>
                        <button id="signin-btn"
                            class="btn block mx-auto border-2 border-solid border-white hover:bg-white hover:text-green-950 hover:border-white px-14 mt-5 col-span-2">Sign
                            In</button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<!-- <template>
    <div class="h-screen bg-blue-950">
        <div
            class="signContainer relative max-w-full h-[75dvh] grid-cols[1fr] overflow-hidden bg-white before before:content-[''] before:absolute before:-translate-y-2/4 before:w-[2000px] before:h-[4000px] before:bg-green-800 before:right-2/4 before:duration-[800ms] before:ease-in-out before:z-[6]">

            <section class="forms-cont absolute w-full h-full top-0 left-0">
                <div
                    class="signin-signup absolute z-[5] top-[95%] lg:top-2/4 left-1/2 lg:left-3/4 w-full md:w-6/12 duration-[1000ms] ease-in-out -translate-x-1/2 -translate-y-full md:-translate-y-1/2 grid">

                    <form action="" @submit.prevent="signinForm()"
                        class="signin-form col-[1_/_span_2] row-[1_/_span_2] z-[2] duration-[100ms] delay-[500ms] overflow-hidden px-10">
                        <h1 class="text-center text-4xl mb-8 font-bold">Sign In</h1>
                        <div ref="notExistMsg"
                            class="hidden w-fit mx-auto flex-col items-center text-red-600 justify-center py-3 px-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-8">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                            </svg>
                            <p>Your Email or Password is incorrect</p>
                        </div>
                        <label class="input sign-inputs mb-4 relative">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                class="h-4 w-4 opacity-70 hidden md:block">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input ref="emailInput" type="email" class="grow " placeholder="Email Address"
                                v-model="email" @input="validateEmail" />
                            <span v-if="emailError"
                                class="error-msg absolute text-[6px] md:text-[10px] -bottom-[20px] left-0 text-red-700">{{
                                    emailError }}</span>
                        </label>
                        <label class="input sign-inputs">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                class="h-4 w-4 opacity-70 hidden md:block">
                                <path fill-rule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clip-rule="evenodd" />
                            </svg>
                            <input ref="passInput" type="password" class="grow" placeholder="Password"
                                v-model="password" />
                        </label>
                        <button onclick="my_modal_1.showModal()"
                            class="btn border-0 text-stone-600 text-xs shadow-none min-h-0 h-0 hover:text-red-700">Forgot
                            Password?</button>
                        <dialog id="my_modal_1" class="modal">
                            <div class="modal-box bg-white relative">
                                <h3 class="text-lg font-bold">Reset Password</h3>
                                <div class="modal-action">
                                    <form method="dialog" class="w-full flex ">
                                        <input ref="emailInput" type="email"
                                            class="grow rounded-md focus:outline-none border-2 border-solid border-stone-400 p-2"
                                            placeholder="Email Address" v-model="emailReset" />
                                        <button @click="forgotPassword"
                                            class="btn ms-5 bg-[#166534] hover:bg-[#0A1E1E] text-white">Reset</button>
                                        <button
                                            class="btn ms-2 text-stone-800 hover:text-red-600 border-none shadow-none absolute top-0 right-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="size-4">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                        <button
                            class="signin-btn btn btn-active bg-[#166534] hover:bg-[#0A1E1E] block mx-auto border-0 text-white px-10 mt-5">Sign
                            In</button>
                    </form>

                    <form action="" @submit.prevent="submitForm()"
                        class="signup-form col-[1_/_span_2] row-[1_/_span_2] z-[1] duration-[100ms] delay-[500ms] grid grid-cols-2 ps-10 pe-16 overflow-hidden opacity-0">
                        <h1 class="text-center text-4xl mb-8 font-bold col-span-2">Sign Up</h1>
                        <label class="input sign-inputs mb-4 me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                class="h-4 w-4 opacity-70 hidden md:block">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input type="text" class="grow" placeholder="Full Name" v-model="fullname" required />
                        </label>
                        <label class="input sign-inputs mb-4 relative">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                class="h-4 w-4 opacity-70 hidden md:block">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input type="email" class="grow" placeholder="Email Address" v-model="email"
                                @input="validateEmail" required />
                            <span v-if="emailError"
                                class="error-msg absolute text-[6px] lg:text-[10px] -bottom-[20px] left-0 text-red-700">{{
                                    emailError }}</span>
                            <span v-if="emailExist"
                                class="error-msg absolute text-[6px] lg:text-[10px] -bottom-[20px] left-0 text-red-700">{{
                                    emailExist }}</span>
                        </label>
                        <label class="input sign-inputs mb-4 me-3 relative">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                class="h-4 w-4 opacity-70 hidden md:block">
                                <path fill-rule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clip-rule="evenodd" />
                            </svg>
                            <input type="password" class="grow" placeholder="Password" v-model="password"
                                @input="validatePasswords" required />
                            <span v-if="passwordError"
                                class="error-msg absolute text-[6px] lg:text-[10px] -bottom-[20px] left-0 text-red-700">{{
                                    passwordError }}</span>
                        </label>
                        <label class="input sign-inputs mb-4 relative">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                class="h-4 w-4 opacity-70 hidden md:block">
                                <path fill-rule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clip-rule="evenodd" />
                            </svg>
                            <input type="password" class="grow" placeholder="Re-Password" v-model="rePassword"
                                @input="chckPassword" required />
                            <span v-if="rePasswordError"
                                class="error-msg absolute text-[6px] lg:text-[10px] -bottom-[20px] left-0 text-red-700">{{
                                    rePasswordError }}</span>
                        </label>
                        <label class="input sign-inputs mb-4 me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="h-4 w-4 opacity-70 hidden md:block">
                                <path fill-rule="evenodd"
                                    d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                                    clip-rule="evenodd" />
                            </svg>
                            <input type="text" class="grow" placeholder="Phone Number" v-model="phonenumber" required />
                        </label>
                        <div class="flex items-center justify-around  mb-4">
                            <label class="label cursor-pointer">
                                <span class="label-text me-2 text-xs lg:text-base">Male</span>
                                <input type="radio" name="radio-10" value="male"
                                    class="radio w-4 h-4 checked:bg-blue-600 border-stone-600 checked:border-blue-600"
                                    checked="checked" v-model="gender" />
                            </label>
                            <label class="label cursor-pointer">
                                <span class="label-text me-2 text-xs lg:text-base">Female</span>
                                <input type="radio" name="radio-10" value="female"
                                    class="radio w-4 h-4 checked:bg-blue-600 border-stone-600 checked:border-blue-600"
                                    checked="checked" v-model="gender" />
                            </label>
                        </div>
                        <button
                            class="signup-btn btn btn-active bg-[#166534] hover:bg-[#0A1E1E] block mx-auto border-0 text-white px-10 mt-5 col-span-2">Sign
                            Up</button>
                    </form>

                </div>
            </section>

            <section class="panels-cont absolute w-full h-full top-0 left-0 grid ">
                <div
                    class="panel left-panel pointer-events-auto duration-[1000ms] ease-in-out z-[6] flex sm:flex-row md:flex-col md:justify-center items-center text-white md:mt-0">
                    <div class="text transition-transform duration-[900ms] delay-[300ms] ease-in-out">
                        <h3 class="text-center text-3xl mb-3">Hello, Friend!</h3>
                        <p class="text-sm">Enter your Info and Start Journey with Us</p>
                        <button id="signup-btn"
                            class="btn btn-active block mx-auto border-2 border-solid border-white hover:bg-white hover:text-green-950 hover:border-white px-10 mt-5 col-span-2">Sign
                            Up</button>
                    </div>
                </div>

                <div
                    class="panel right-panel pointer-events-none opacity-0 duration-[1000ms] ease-in-out z-[6] flex sm:flex-row md:flex-col md:justify-center items-center text-white">
                    <div
                        class="text transition-transform duration-[900ms] delay-[300ms] ease-in-out translate-x-[800px]">
                        <h3 class="text-center text-3xl mb-3">Welcome Back!</h3>
                        <p class="text-sm">To Keep Connected with us, Please login with your info</p>
                        <button id="signin-btn"
                            class="btn block mx-auto border-2 border-solid border-white hover:bg-white hover:text-green-950 hover:border-white px-10 mt-5 col-span-2">Sign
                            In</button>
                    </div>
                </div>

            </section>

        </div>
    </div>
</template>
 -->

<script>
// import { onMounted } from 'vue';
import axios from 'axios';

export default {
    name: 'SignPage',

    data() {
        return {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
            rePassword: '',
            gender: '',
            address: {
                latitude: '',
                longitude: '',
                location: ''
            },
            addressErrMessage: '',
            addressFlag: true,
            emailError: '',
            emailReset: '',
            emailExist: '',
            passwordError: '',
            rePasswordError: '',
            apiKey: '3199d0b4fb7e4184b017cfade26c7298',
            signUpBtn:'',
            signInBtn:'',
            signContainer:''
        }
    },
    methods: {
        async validateEmail() {
            const emailPattern = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/g;
            this.emailExist = '';

            if (this.email && !emailPattern.test(this.email)) {
                this.emailError = "Please enter a valid email address";
            } else {
                this.emailError = '';
            }
        },
        validatePasswords() {
            const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
            if (this.password && !passwordPattern.test(this.password)) {
                this.passwordError = "Must be at least 8 characters";
            } else {
                this.passwordError = '';
            }
        },
        chckPassword() {
            if (this.password !== this.rePassword) {
                this.rePasswordError = "Passwords do not match";
            } else {
                this.rePasswordError = '';
            }
        },
        async submitForm() {
            let res = (await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(this.address.location)}&key=3199d0b4fb7e4184b017cfade26c7298`)).data
            if (res.results[0]) {
                this.address.latitude = res.results[0].geometry.lat
                this.address.longitude = res.results[0].geometry.lng
                console.log(this.address);
            } else {
                this.addressErrMessage = 'Enter a valid address'
            }

            this.validateEmail();
            this.validatePasswords();
            this.chckPassword();

            if (this.emailError || this.passwordError || this.rePasswordError || this.addressErrMessage) {
                return;
            }

            try {
                const usersRes = await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/users.json');
                const usersData = usersRes.data || {};
                const emailExists = Object.values(usersData).some(user => user.email === this.email);

                if (emailExists) {
                    this.emailExist = "This email already exists";
                    return;
                } else {
                    this.emailExist = '';
                }
            }
            catch (err) {
                console.error("Error checking email existence:", err);
                return;
            }

            try {
                const res = await axios.post('https://dailymart-5c550-default-rtdb.firebaseio.com/users.json', {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    phone: this.phonenumber,
                    email: this.email,
                    password: this.password,
                    gender: this.gender,
                    role: 'user',
                    address: this.address,
                });
                console.log(res.data);
                this.signContainer.classList.remove("signup-mode");
            }
            catch (error) {
                console.error("There was an error:", error);
            }
        },
        async signinForm() {
            this.validateEmail();
            if (this.emailError) {
                return;
            }

            try {
                const usersRes = await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/users.json');
                const usersData = usersRes.data || {};


                let loggedUser = Object.entries(usersData).find(user => user[1].email.toLowerCase() == this.email.toLowerCase() && user[1].password.toLowerCase() == this.password.toLowerCase());

                if (loggedUser) {
                    if (loggedUser[1].profilePicture) {
                        this.$store.dispatch('setUserData', loggedUser)
                        this.$router.push("/");
                    }
                    else {
                        if (loggedUser[1].gender == 'male') {
                            loggedUser[1].profilePicture = (await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/userAvatar/maleImage.json')).data
                        }
                        else {
                            loggedUser[1].profilePicture = (await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/userAvatar/femaleImage.json')).data
                        }
                        await axios.patch(`https://dailymart-5c550-default-rtdb.firebaseio.com/users/${loggedUser[0]}.json`, { profilePicture: loggedUser[1].profilePicture })
                        this.$store.dispatch('setUserData', loggedUser)
                        this.$router.push("/");
                    }
                    this.$store.dispatch('setUserData', loggedUser)
                    this.$router.push("/");
                }
                else {
                    this.$refs.notExistMsg.classList.add("not-exist");
                    this.email = '';
                    this.password = '';
                    // this.$refs.emailInput.addEventListener("focus", () => {
                    //     this.$refs.notExistMsg.classList.remove("not-exist");
                    // })
                    // this.$refs.passInput.addEventListener("focus", () => {
                    //     this.$refs.notExistMsg.classList.remove("not-exist");
                    // })
                }
            } catch (error) {
                console.error("There was an error:", error);
            }
        },
        async forgotPassword() {
            try {
                const usersRes = await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/users.json');
                const usersData = usersRes.data || {};
                const emailExists = Object.values(usersData).some(user => user.email === this.emailReset);

                if (emailExists) {
                    // Send Email
                    console.log(this.emailReset)
                    alert('Please check your email to reset your password.');
                    this.emailReset = '';
                } else {
                    alert('No Account with this Email.');
                    this.emailReset = '';
                }
            } catch (error) {
                console.error("There was an error:", error);
                alert('Something went wrong, please try again.');
            }
        },
        getUserLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async postion => {
                        this.address.latitude = postion.coords.latitude
                        this.address.longitude = postion.coords.longitude
                        let res = (await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${this.address.latitude},${this.address.longitude}&key=${this.apiKey}`)).data
                        if (res.results) {
                            res.results.forEach(place => this.address.location = place.formatted)
                        }
                        console.log(this.address);
                        this.addressFlag = false
                    },
                    err => {
                        console.log(err);
                    }
                )
            }
            else {
                alert("This browser doesn't support live location")
            }
        }
    },
    mounted() {
        this.signUpBtn = document.getElementById("signup-btn");
        this.signInBtn = document.getElementById("signin-btn");
        this.signContainer = document.querySelector(".signContainer");

        this.signUpBtn.addEventListener("click", () => {
            this.signContainer.classList.add("signup-mode");
        });
        this.signInBtn.addEventListener("click", () => {
            this.signContainer.classList.remove("signup-mode");
        });
    },
}
</script>

<style scoped>
.not-exist {
    display: flex;
}

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

@media (max-width: 768px) {
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