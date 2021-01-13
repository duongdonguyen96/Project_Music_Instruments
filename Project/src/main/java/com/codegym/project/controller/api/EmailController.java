package com.codegym.project.controller.api;
import com.codegym.project.model.Employee;
import com.codegym.project.model.Gmail.GooglePojo;
import com.codegym.project.model.Gmail.GoogleUtils;
import com.codegym.project.model.Gmail.Utility;
import com.codegym.project.service.EmployeeService;
import net.bytebuddy.utility.RandomString;
import org.apache.http.client.ClientProtocolException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

@Controller
public class EmailController {

    @Autowired
    public JavaMailSender emailSender;
    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private GoogleUtils googleUtils;

    @ResponseBody


    @GetMapping(value = "/forgot_password")
    public ModelAndView showForgotPasswordForm() {
        ModelAndView modelAndView = new ModelAndView("login/forgot_password_form");
        return modelAndView;
    }

    @PostMapping("/forgot_password")
    public String processForgotPassword(HttpServletRequest request, Model model) {
        String email = request.getParameter("email");
        String token = RandomString.make(30);

        try {
            employeeService.updateResetPasswordToken(token, email);
            String resetPasswordLink = Utility.getSiteURL(request) + "/reset_password?token=" + token;
            sendEmail(email, resetPasswordLink);
            model.addAttribute("message", "We have sent a reset password link to your email. Please check.");

        } catch (Exception e) {
            model.addAttribute("error", "Error while sending email");
        }

        return "login/forgot_password_form";
    }

    public void sendEmail(String recipientEmail, String link)
            throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("duongdonguyen96@gmail.com", "DuongDoNguyen");
        helper.setTo(recipientEmail);

        String subject = "Reset your password (From DuongDonguyen";

        String content = "<p>Hello,</p>"
                + "<p>You have requested to reset your password.</p>"
                + "<p>Click the link below to change your password:</p>"
                + "<p><a href=\"" + link + "\">Change my password</a></p>"
                + "<br>"
                + "<p>Ignore this email if you do remember your password, "
                + "or you have not made the request.</p>";

        helper.setSubject(subject);

        helper.setText(content, true);

        emailSender.send(message);
    }

    @GetMapping("/reset_password")
    public String showResetPasswordForm(@Param(value = "token") String token, Model model) {
        Employee employee = employeeService.getByResetPasswordToken(token);
        model.addAttribute("token", token);

        if (employee == null) {
            model.addAttribute("message", "Invalid Token");
            return "message";
        }
        return "login/reset_password_form";
    }

    @PostMapping("/reset_password")
    public String processResetPassword(HttpServletRequest request, Model model) {
        String token = request.getParameter("token");
        String password = request.getParameter("password");
        String password2 = request.getParameter("password2");

        Employee employee = employeeService.getByResetPasswordToken(token);
        model.addAttribute("title", "Reset your password");

          if (!password.equalsIgnoreCase(password2)) {

            model.addAttribute("message", "Please enter the correct password.");

        } else if (password.equalsIgnoreCase(password2)){
            employeeService.updatePassword(employee, password);

            model.addAttribute("message", "You have successfully changed your password.");
        }

        return "login/reset_password_form";
    }


    @RequestMapping(value = {"/", "/login"})
    public String login() {
        return "login/formLogin";
    }

    @GetMapping("/loginSocial")
    public String loginGoogle(HttpServletRequest request) throws ClientProtocolException, IOException {
        String code = request.getParameter("code");
        System.out.println(code);
        if (code == null || code.isEmpty()) {
            return "redirect:/login?google=error";
        }
        String accessToken = googleUtils.getToken(code);
        GooglePojo googlePojo = googleUtils.getUserInfo(accessToken);
        UserDetails userDetail = googleUtils.buildUser(googlePojo);
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetail, null,
                userDetail.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return "admin/Banner";
    }

//    @RequestMapping("/user")
//    public String user() {
//        return "user";
//    }
//
//    @RequestMapping("/admin")
//    public String admin() {
//        return "admin";
//    }

    @RequestMapping("/403")
    public String accessDenied() {
        return "403";
    }

}