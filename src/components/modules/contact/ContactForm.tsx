"use client";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PPForm from "../../UI/form/PPForm";
import PPInput from "../../UI/form/PPInput";
import PPTextarea from "../../UI/form/PPTextArea";
import PPButton from "../../UI/button/PPButton";
import { sendEmailSchema } from "@/src/schemas/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendContactEmail } from "@/src/hooks/auth.mutate.hook";
import { toast } from "sonner";
import { z } from "zod";

const ContactForm = () => {
  const { mutate: handleSendEmail, isLoading } = useSendContactEmail();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const returnEmail = window.prompt(
      "Please enter your email where the email will be sended. This is for assignment purpose to check email send successfully."
    );
    try {
      z.string().email().parse(returnEmail);
      const emailData = {
        userName: data.name,
        userEmail: data.email,
        message: data.message,
        sendToEmail: returnEmail,
      };
      handleSendEmail(emailData);
    } catch (error) {
      toast.error("Please enter a valid email address");
    }
  };
  return (
    <PPForm onSubmit={onSubmit} resolver={zodResolver(sendEmailSchema)}>
      <div className="grid gap-6">
        <PPInput name="name" label="Enter Name" type="text" />
        <PPInput name="email" label="Enter Email" type="email" />
        <PPTextarea name="message" label="Enter Your Message" />
      </div>
      <div>
        <PPButton
          buttonText="Send Email"
          buttonType="submit"
          className="mt-10"
          isLoading={isLoading}
        />
      </div>
    </PPForm>
  );
};

export default ContactForm;
