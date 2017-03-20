<template>
    <tabs>
      <tab id="mail" :title="'label.mail'|trans" open=true>
        <form @submit.prevent="sendMail">
          <b-input label=true :item="{label: 'contact', id:'sendMailContact', value: mail.contact }"></b-input>
          <b-input label=true :item="{label: 'object', id:'sendMailObject', value: mail.object }"></b-input>
          <label for="sendMailMessage">{{'label.message'|trans}}</label>
          <textarea id="sendMailmessage" cols="30" rows="5" class="form-control" ></textarea>
          <button class="btn btn-block btn-primary">{{'action.send'|trans}}</button>
        </form>
      </tab>
      <tab id="sms" :title="'label.sms'|trans">
        <form @submit.prevent="sendSms">
          <b-input label=true :item="{label: 'contact', id:'sendSmsContact', value: sms.contact }"></b-input>
          <label for="sendSmsMessage">{{'label.message'|trans}}</label>
          <textarea id="sendSmsmessage" cols="30" rows="5" class="form-control" v-model="sms.message" ></textarea>
          <button class="btn btn-block btn-primary">{{'action.send'|trans}}</button>
        </form>
      </tab>
      <tab id="note" :title="'label.note'|trans">
        <form @submit.prevent="sendNote">
          <b-input label=true :item="{label: 'contact', id:'sendNoteContact', value: note.contact }"></b-input>
          <label for="sendNoteMessage">{{'label.message'|trans}}</label>
          <textarea id="sendNotemessage" cols="30" rows="5" class="form-control" v-model="note.message"></textarea>
          <button class="btn btn-block btn-primary">{{'action.send'|trans}}</button>
        </form>
      </tab>
    </tabs>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'send',
    data () {
    },
    computed: {
      ...mapGetters('messageModule', ['sms', 'mail', 'note'])
    },
    methods: {
      ...mapActions('messageModule', ['sendMail', 'sendSms', 'sendNote'])
    }
  }
</script>

<style lang="less">
</style>