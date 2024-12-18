"""added User model

Revision ID: d97608732225
Revises: 993f28fb18fb
Create Date: 2024-12-01 20:37:37.232643

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd97608732225'
down_revision = '993f28fb18fb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('task')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('task',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('username', sa.VARCHAR(length=80), nullable=False),
    sa.Column('email', sa.VARCHAR(length=120), nullable=False),
    sa.Column('text', sa.TEXT(), nullable=False),
    sa.Column('status', sa.BOOLEAN(), nullable=True),
    sa.Column('created', sa.DATETIME(), nullable=False),
    sa.Column('text_is_edited', sa.BOOLEAN(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
