# Digital Nomad App

The mobile skeleton for a future course-learning app. Cities, categories and favorites are the reference feature it is built and tested against.

## Language

### Access

**Session**:
Proof that someone is signed in on this device. It starts at sign-in and ends at sign-out or when it expires.
_Avoid_: auth, login, auth user (when you mean "is someone signed in")

**AuthUser**:
The profile of the person a Session belongs to: name, email, avatar. It is owned by the backend.
_Avoid_: user session, account
