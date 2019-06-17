<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ContactMain extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The form data field containing the following fields:
     * - Name
     * - Email
     * - Product name
     * - Message
     */
    public $form_data;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    
    public function __construct($form_data)
    {
        $this->form_data = $form_data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        // dd($this->form_data);
        return $this->from('meil@gmail.com')
            ->view('emails.emailMain')
            ->with([
                'name' => $this->form_data['name'],
                'email' => $this->form_data['email'],
                'msg' => $this->form_data['message']
            ])
            ->subject('New Contact Mail');
    }
}
